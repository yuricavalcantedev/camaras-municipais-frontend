import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ParlamentarPresence } from '../domain/parlamentar-presence.model';
import { Parlamentar } from '../domain/parlamentar.model';
import { RoleInSession } from '../domain/role-session.model';
import { Session } from '../domain/session.model';
import { Subject } from '../domain/subject.model';
import { TownHall } from '../domain/townhall.model';
import { ParlamentarTimer } from '../dto/parlamentar-timer.model';
import { SessionDTOCreate } from '../dto/session-dto-create.model';
import { SubjectVotingDTO } from '../dto/subject-voting-dto.model';
import { Timer } from '../interfaces/timers';
import { ParlamentarService } from '../service/parlamentar.service';
import { SessionService } from '../service/session.service';
import { TownHallService } from '../service/townhall.service';

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
  selectedParlamentarPresenceIdList: ParlamentarPresence[] = new Array();
  selectedSubjectList: Subject[] = new Array();  

  showDialog: boolean = false;
  showVotingDialog: boolean = false;
  submitted: boolean = false;
  existsSession: boolean = false;
  existsOpenVoting: boolean = false;
  loading: boolean = false;
  disableParlamentarDropdown = true;

  timers: Timer [];
  selectedTimer: Timer;
  expediente:string;
  disableInput: boolean = true;
  

  sessionUUID: string = '';
  session: Session;
  form: FormGroup;
  roleInSessionListPart1: RoleInSession[] = new Array();
  roleInSessionListPart2: RoleInSession[] = new Array();
  roleInSessionListPart3: RoleInSession[] = new Array();
  
  isShowTimerTabOpened: boolean = false;

  @Output() updateParlamentar = new EventEmitter<boolean>();
  @Output() updateFlagTransmitir = new EventEmitter<boolean>();

  constructor(public parlamentarService: ParlamentarService, public townHallService: TownHallService, private cookieService: CookieService,
    private messageService: MessageService, private sessionService: SessionService, private router: Router) {

      this.selectedTimer = null;
      this.timers = [
        {label: "00:30", minutes: 0, seconds:30},
        {label: "01:00", minutes: 1, seconds:0},
        {label: "02:00", minutes: 2, seconds:0},
        {label: "03:00", minutes: 3, seconds:0},
        {label: "05:00", minutes: 5, seconds:0},
        {label: "10:00", minutes: 10, seconds:0},
        {label: "15:00", minutes: 15, seconds:0},
        {label: "30:00", minutes: 30, seconds:0},
        {label: "45:00", minutes: 45, seconds:0},
        {label: "60:00", minutes: 60, seconds:0}
      ];

      this.expediente = "Grande Expediente";
      this.cookieService.set('expedientType', this.expediente);
      this.clearParlamentarTimerInfoFromCookies();

  }

  ngOnInit(): void {

    this.townhallId = Number(this.cookieService.get('user-townhall-id'));
    this.sessionUUID = this.cookieService.get('session-uuid');
    
    this.sessionService.findSessionTodayByTownhall(this.townhallId).subscribe({
      next: data => {
        this.sessionUUID = data.uuid;
        this.existsSession = true;
        setInterval(() =>{
          this.findSessionByUUID(this.sessionUUID);
        }, 2000);
      },
      error: err => {

      }
    })

    this.townHallService.getById(this.townhallId).subscribe({      
        
      next: data => {
          this.townhall = data;
          this.townHallCityName = this.townhall.name;
          this.cookieService.set('townHallCityName', this.townHallCityName);
          this.cookieService.set('townHallUrlImage', this.townhall.urlImage);
        },
        error: error => {
          this.messageService.add({severity:'error', summary:'Erro!', detail:'Aconteceu algum erro inesperado!'});
        }
    });

    this.form = new FormGroup({
      id:new FormControl('', [Validators.required]),
    });
    
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
    if(environment.production){
      window.open('https://camaras-municipais-frontend.vercel.app/painel-votacao', "_blank");
    }else{
      window.open('http://localhost:4200/painel-votacao', "_blank");
    }
  }

  onSubmit(){

    this.loading = true;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.form.get('id').disable();

      let formValue = this.form.value;
      let sessionDTOCreate = new SessionDTOCreate(formValue.id, this.townhallId);
      this.sessionService.create(sessionDTOCreate).subscribe({
        
        next: res => {
          this.session = res;
          this.cookieService.set('session-uuid', this.session.uuid);
          this.existsSession = true;
          this.fillRoleInSessionLists(this.session.roleInSessionList);
          this.onCancelar();
          this.loading = false;
          this.form.get('id').enable();
          this.sessionUUID = this.session.uuid;
          
          setInterval(() => {
            this.findSessionByUUID(this.session.uuid);
          }, 3000);
        },
        error: err => {
          console.log(err);
          this.messageService.add({key: 'bc', severity:'error', summary:'Erro!', detail:err.error.message});
          this.onCancelar();
          this.loading = false;
        }
      });
  }

  onCancelar(){

    this.showDialog = false;
    this.clearInputs();
  }

  onOpeningVoting(){

    let subjectDTOList = this.selectedSubjectList.map((subject) => new SubjectVotingDTO(subject));
    this.sessionService.createVoting(this.session.uuid, subjectDTOList).subscribe({
      next: data => {
        this.session.votingList.push(data);
        this.onHideVotingDialog();
        this.existsOpenVoting = true;
      }, error: error => {
        //do nothing
      }
      
    });
    
  }

  findSessionByUUID(sessionUUID: string){

    this.sessionService.findByUUID(sessionUUID).subscribe({
      next: data => {
        this.session = data;
        if(this.session.votingList.length == 0){
          this.existsOpenVoting = false;
        }else{
          this.existsOpenVoting = this.session.votingList.find(voting => voting.status == 'VOTING') != undefined;
        }
      },
      error: error => {
        
        //do nothing
      }
    });
  }

  updatePresenceParlamentarList(){

    if(this.selectedParlamentarPresenceIdList != null && this.selectedParlamentarPresenceIdList.length > 0){

      let parlamentarIdList = this.selectedParlamentarPresenceIdList.map(parlamentar => parlamentar.id);
      this.sessionService.updateParlamentarPresenceList(this.sessionUUID, parlamentarIdList).subscribe({
        next: data => {
          this.messageService.add({key: 'bc', severity:'success', summary:'Sucesso!', detail:'Os vereadores selecionados tiveram suas presenças confirmadas.'});
        },
        error: error => {
          this.messageService.add({key: 'bc', severity:'error', summary:'Erro!', detail:'Ocorreu algum erro, espere alguns segundos e tente novamente'});
        }
      })
    }
  }

  onTransmitir(parlamentar: Parlamentar){

    if(this.selectedTimer == null){
      this.messageService.add({key: 'bc', severity:'warn', summary:'Inválido!', detail:'Você precisa selecionar uma das opções de tempo antes de transmitir'});
    }else{
      
      let parlamentarTimer = new ParlamentarTimer();
      parlamentarTimer.buildFromParlamentar(parlamentar);
      parlamentarTimer.timeToSpeak = this.selectedTimer.minutes * 60 + this.selectedTimer.seconds;
      this.cookieService.set('parlamentarObject', JSON.stringify(parlamentarTimer));
    
      if(!this.isShowTimerTabOpened){
        if(environment.production){
          window.open('https://camaras-municipais-frontend.vercel.app/mostrarTempo', "_blank");
        }else{
          window.open('http://localhost:4200/mostrarTempo', "_blank");
        }

        this.isShowTimerTabOpened = true;
      }
      

    }
  }

  onAParte(parlamentar: Parlamentar){
    
    let parlamentarTimer = new ParlamentarTimer();
    parlamentarTimer.buildFromParlamentar(parlamentar);
    parlamentarTimer.timeToSpeak = 120;

    this.cookieService.set('parlamentarAParteObject', JSON.stringify(parlamentarTimer));
  }

  onFinalizarTempo(){
    this.cookieService.set('endMainTimer', 'true');
  }

  onFinalizarAParte(){
    this.cookieService.set('endSubTimer', 'true');
  }

  clearParlamentarTimerInfoFromCookies(){

    this.cookieService.set('parlamentarObject', '');
    this.cookieService.set('parlamentarAParteObject', '');
    this.cookieService.set('endMainTimer', 'false');
    this.cookieService.set('endSubTimer', 'false');
  }

  chooseExpediente(flag: boolean){
    this.disableInput = flag;
  }
  
  onTownHallChange(){
    
    this.showParlamentarImage = false;
    this.parlamentarList = [];
    this.selectedParlamentarPresence = new ParlamentarPresence();
    this.disableParlamentarDropdown = false;
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
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Votação encerrada!'});
      },
      error: err => {
        this.messageService.add({severity:'error', summary:'Erro!', detail:'Ocorreu um erro inesperado, fale com o administrador'});
      }
    });
  }

  cleanCookies(){
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

}
