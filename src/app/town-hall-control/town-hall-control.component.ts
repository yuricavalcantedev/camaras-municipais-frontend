import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ParlamentarPresence } from '../domain/parlamentar-presence.model';
import { Parlamentar } from '../domain/parlamentar.model';
import { RoleInSession } from '../domain/role-session.model';
import { Session } from '../domain/session.model';
import { Subject } from '../domain/subject.model';
import { TownHall } from '../domain/townhall.model';
import { SessionDTOCreate } from '../dto/session-dto-create.model';
import { SubjectVotingDTO } from '../dto/subject-voting-dto.model';
import { ParlamentarService } from '../service/parlamentar.service';
import { SessionService } from '../service/session.service';
import { TownHallService } from '../service/townhall.service';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-town-hall-control',
  templateUrl: './town-hall-control.component.html',
  styleUrls: ['./town-hall-control.component.css']
})

export class TownHallControlComponent implements OnInit {

  showParlamentarImage: boolean = false;
  townHallCityName: string = '';
  townhall: TownHall = new TownHall();
  townhallId: number;
  parlamentarList: Parlamentar[];
  selectedParlamentarPresence: ParlamentarPresence = new ParlamentarPresence();
  selectedParlamentarPresenceList: ParlamentarPresence[] = new Array();
  selectedSubjectList: Subject[] = new Array();  

  showDialog: boolean = false;
  showVotingDialog: boolean = false;
  submitted: boolean = false;
  existsSession: boolean = false;
  existsOpenVoting: boolean = false;
  loading: boolean = false;
  disableParlamentarDropdown = true;
  

  sessionUUID: string = '';
  session: Session;
  form: FormGroup;
  roleInSessionListPart1: RoleInSession[] = new Array();
  roleInSessionListPart2: RoleInSession[] = new Array();
  roleInSessionListPart3: RoleInSession[] = new Array();
  

  @Output() updateParlamentar = new EventEmitter<boolean>();
  @Output() updateFlagTransmitir = new EventEmitter<boolean>();

  constructor(public parlamentarService: ParlamentarService, public townHallService: TownHallService, private cookieService: CookieService, 
    private utilService: UtilService, private messageService: MessageService, private sessionService: SessionService) {

  }

  ngOnInit(): void {

    this.townhallId = Number(this.cookieService.get('user-townhall-id'));
    this.sessionUUID = this.cookieService.get('session-uuid');
    if(this.sessionUUID != null && this.sessionUUID != undefined && this.sessionUUID != ''){
      
      this.existsSession = true;
      setInterval(() =>{
        this.findSessionByUUID(this.sessionUUID);
      }, 2000);
    }

    this.townHallService.getById(this.townhallId).subscribe({      
        
      next: data => {
          this.townhall = data;
          this.townHallCityName = this.townhall.city;
          this.utilService.getUtilShowTimer().setTownHall(this.townhall);
        },
        error: error => {
          this.messageService.add({severity:'error', summary:'Erro!', detail:'Aconteceu algum erro inesperado!'});
        }      
    });    

    this.form = new FormGroup({
      id:new FormControl('', [Validators.required]),
    });

    //the buttons will start disabled
    this.updateFlagTransmitir.emit(true);    
    
  }

  openDialog(){
    this.showDialog = true;
  }

  openVotingDialog(){
    this.showVotingDialog = true;
  }

  onHideVotingDialog(){
    this.showVotingDialog = false;
  }

  clearInputs(){
    
    this.submitted = false;
    this.form.reset();
  }

  get formRef(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  openEletronicPanel(){
    window.open('http://localhost:4200/painel-votacao', "_blank");
  }

  onSubmit(){

    this.loading = true;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.form.get('id').disable();

    try {
      
      let formValue = this.form.value;
      let sessionDTOCreate = new SessionDTOCreate(formValue.id, this.townhallId);
      this.sessionService.create(sessionDTOCreate).subscribe(res =>{
        
        this.session = res;
        this.cookieService.set('session-uuid', this.session.uuid);
        this.existsSession = true;
        this.fillRoleInSessionLists(this.session.roleInSessionList);
        this.onCancelar();
        this.loading = false;
        this.form.get('id').enable();
        
        setInterval(() => {
          this.findSessionByUUID(this.session.uuid);
        }, 3000);
        
      });

    }catch(error){

    }
  }

  onCancelar(){

    this.showDialog = false;
    this.clearInputs();
  }

  onOpeningVoting(){

    let subjectDTOList = this.selectedSubjectList.map((subject) => new SubjectVotingDTO(subject));
    this.sessionService.createVoting(this.session.uuid, subjectDTOList).subscribe((newVoting)=>{
      
      this.session.votingList.push(newVoting);
      console.log(newVoting);
      //dividir a lista da sessao em duas e fazer um for em cada lado dessa lista
      this.onHideVotingDialog();
      this.existsOpenVoting = true;
    });
    
  }

  findSessionByUUID(sessionUUID: string){

    this.sessionService.findByUUID(sessionUUID).subscribe(res => {
      this.session = res;
    });
  }

  selectRow(item: ParlamentarPresence){

    this.selectedParlamentarPresenceList = [];
    this.selectedParlamentarPresenceList.push(item);
    this.utilService.getUtilShowTimer().setParlamentar(item.parlamentar);
    this.updateFlagTransmitir.emit(false);

  }

  onTransmitir(parlamentar: Parlamentar){
    
    this.utilService.getUtilShowTimer().setParlamentar(parlamentar);
    this.updateParlamentar.emit(true);
  }

  openModalWithTime(){

  }

  onFinalizarTempo(){
    
    this.utilService.getUtilShowTimer().setFinishMainTimer(true);
    this.updateParlamentar.emit(true);

  }

  onFinalizarAParte(){

      this.utilService.getUtilShowTimer().setFinishAParteTimer(true);
      this.updateParlamentar.emit(true);

  }
  
  onTownHallChange(){
    
    this.showParlamentarImage = false;
    this.parlamentarList = [];
    this.selectedParlamentarPresence = new ParlamentarPresence();
    this.disableParlamentarDropdown = false;
    
  }

  onAParte(parlamentar: Parlamentar){
    this.utilService.getUtilShowTimer().setParlamentarAParte(parlamentar);
    this.utilService.changeTransmitirData(true);
  }

  fillRoleInSessionLists(roleInSessionList: RoleInSession[]): void{

    for(let i = 0; i < roleInSessionList.length; i++){
      
      if(i < 4){
        this.roleInSessionListPart1.push(roleInSessionList[i]);
      }else if( i < 8){
        this.roleInSessionListPart2.push(roleInSessionList[i]);
      }else if( i < 12){
        this.roleInSessionListPart3.push(roleInSessionList[i]);
      }
    }
  }

  closeVoting(){

    this.sessionService.closeVoting(this.session.uuid).subscribe({
      next: res => {
        console.log(res);
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Votacao encerrada!'});
      },
      error: err => {
        this.messageService.add({severity:'error', summary:'Erro!', detail:'Ocorreu um erro inesperado, fale com o administrador'});
      }
    });
  }

}
