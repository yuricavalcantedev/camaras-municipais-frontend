import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { TableRole } from 'src/app/domain/table-role.model';
import { ParlamentarPresence } from '../../domain/parlamentar-presence.model';
import { Parlamentar } from '../../domain/parlamentar.model';
import { Session } from '../../domain/session.model';
import { Subject } from '../../domain/subject.model';
import { TownHall } from '../../domain/townhall.model';
import { ParlamentarTimer } from '../../dto/parlamentar-timer.model';
import { SessionDTOCreate } from '../../dto/session-dto-create.model';
import { SubjectVotingDTO } from '../../dto/subject-voting-dto.model';
import { Timer } from '../../interfaces/timers';
import { ParlamentarService } from '../../service/parlamentar.service';
import { SessionService } from '../../service/session.service';
import { TownHallService } from '../../service/townhall.service';
import { UtilService } from 'src/app/service/util.service';
import { VoteDTO } from 'src/app/dto/vote-dto.model';
import { Voting } from 'src/app/domain/voting.model';

@Component({
  selector: 'app-town-hall-control',
  templateUrl: './town-hall-control.component.html',
  styleUrls: ['./town-hall-control.component.css']
})

export class TownHallControlComponent implements OnInit {
  isDialogVotationOpened: boolean = false;
  isDialogVotationFlexOpened: boolean = false;

  showParlamentarImage: boolean = false;
  townHallCityName: string = '';
  townhall: TownHall = new TownHall();
  townhallId: number;
  parlamentarList: Parlamentar[];
  selectedParlamentarPresence: ParlamentarPresence = new ParlamentarPresence();
  selectedParlamentarPresenceIdList: ParlamentarPresence[] = new Array();
  selectedSubjectList: Subject[] = new Array();
  selectedSpeakerType: string = 'GRANDE_EXPEDIENTE';

  showDialog: boolean = false;
  showVotingDialog: boolean = false;
  showDeleteSessionDialog: boolean = false;
  showAddSubjectManuallyDialog: boolean = false;
  submitted: boolean = false;
  existsSession: boolean = false;
  existsOpenVoting: boolean = false;
  loading: boolean = false;
  disableParlamentarDropdown = true;
  disableExpedientDiversos: boolean = true;

  timers: Timer [];
  selectedTimer: Timer;
  expediente:string;
  outroExpediente: string;
  disableInput: boolean = true;

  sessionUUID: string = '';
  session: Session;
  form: FormGroup;
  roleInSessionListPart1: TableRole[] = new Array();
  roleInSessionListPart2: TableRole[] = new Array();
  roleInSessionListPart3: TableRole[] = new Array();

  isShowTimerTabOpened: boolean = false;
  isVotingPanelTabOpened: boolean = false;
  someVoting: Voting = undefined;

  firstInterval: any;
  secondInterval: any;

  subjectType: string = '';
  subjectDescription: string = '';
  subjectYear: string = '';
  subjectAuthor: string = '';
  subjectNumber: string = '';

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
        {label: "20:00", minutes: 20, seconds:0},
        {label: "30:00", minutes: 30, seconds:0},
        {label: "45:00", minutes: 45, seconds:0},
        {label: "60:00", minutes: 60, seconds:0}
      ];

      this.expediente = "Grande Expediente";
      this.outroExpediente = ""
      this.setExpedient();
      this.clearParlamentarTimerInfoFromCookies();

  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    clearInterval(this.firstInterval);
    clearInterval(this.secondInterval);
  }

  ngOnInit(): void {

    this.townhallId = Number(this.cookieService.get('user-townhall-id'));
    this.sessionUUID = this.cookieService.get('session-uuid');
    this.session = new Session();

    this.computeSessionVoting();

    this.sessionService.findSessionTodayByTownhall(this.townhallId).subscribe({
      next: data => {

        console.log(data);
        if(data != null){
          this.sessionUUID = data.uuid;
          this.cookieService.set('session-uuid', data.uuid);
          this.existsSession = true;
          this.firstInterval = setInterval(() =>{
            this.findSessionByUUID(this.sessionUUID);
            this.computeSessionVoting();
          }, 5000);
        }
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

  computeSessionVoting() {
    this.someVoting = this.session.votingList.find(
      (voting) => voting.parlamentarVotingList.some(parlamentarVoting => parlamentarVoting.result !== 'NULL')
    );
  }

  openDialog(){
    this.showDialog = true;
  }

  openAddSubjectManuallyDialog(param: boolean) {
    this.showAddSubjectManuallyDialog = param;

    if (!param) {
      this.subjectType = '';
      this.subjectDescription = '';
      this.subjectYear = '';
      this.subjectAuthor = '';
      this.subjectNumber = '';
    }
  }

  addSubjectManually(type: string, description: string, year: string, author: string, number: string){

    if (!type || !description || !year || !author || !number) {
      this.messageService.add({
        key: 'bc',
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Todos os campos são obrigatórios'
      });
      return;
    }
    // let request = {
    //   type: type, // tipo 'ANY TYPE',
    //   description: description, // assunto 'Ordem do Dia/Expediente: 1 - Projeto de Lei Ordinária nº 99999999999999',
    //   originalTextUrl: 'http://www.google.com', // url do pdf
    //   subjectOrderSapl: 5, // 5
    //   year: year, // ano 2025
    //   author: author, // autor 'Yuri Amancio'
    //   number: number // numero 9823
    // };
    let request = {
      type: type, // tipo 'ANY TYPE',
      description: description, // assunto 'Ordem do Dia/Expediente: 1 - Projeto de Lei Ordinária nº 99999999999999',
      originalTextUrl: description, // url do pdf
      subjectOrderSapl: '', // 5
      year: year, // ano 2025
      author: author, // autor 'Yuri Amancio'
      number: number // numero 9823
    };

    this.sessionService.addSubjectManually(this.sessionUUID, request).subscribe({
      next: result => {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Matéria adicionada com sucesso'
        });
        this.openAddSubjectManuallyDialog(false);
      },
      error: err => {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao adicionar matéria'
        });
      }
    });

    this.showAddSubjectManuallyDialog = false;
  }

  removeSubjectManually(subjectId: number){
    this.sessionService.deleteSubjectManually(this.sessionUUID, subjectId).subscribe({
      next: result => {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Matéria removida com sucesso'
        });
      },
      error: err => {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao remover matéria'
        });
      }
    });
  }

  openVotingDialog(){
    this.showVotingDialog = true;
  }

  openDeleteSessionDialog(){
    this.showDeleteSessionDialog = true;
  }

  onHideDeleteSessionDialog(){
    this.showDeleteSessionDialog = false;
  }

  onHideVotingDialog(){
    this.showVotingDialog = false;
  }

  clearInputs(){

    this.submitted = false;
    this.form.reset();
    this.form.get('id').enable();
  }

  get formRef(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  openEletronicPanel(){
    this.isDialogVotationOpened = true;

    // this.isVotingPanelTabOpened = this.cookieService.get('isVotingPanelTabOpened') == 'true';

    // if(!this.isVotingPanelTabOpened){
    //   this.cookieService.set('isVotingPanelTabOpened', 'true');
    //   window.open('/painel-votacao', "_blank");
    // }
  }

  showViewUniqueVotation() {
    this.isVotingPanelTabOpened = this.cookieService.get('isVotingPanelTabOpened') == 'true';

    // if(!this.isVotingPanelTabOpened){
      this.cookieService.set('isVotingPanelTabOpened', 'true');
      window.open('/painel-votacao', "_blank");
    // }

    this.isDialogVotationOpened = false;
  }

  goToPanel(type: "esquerdo" | "direito") {
    this.isVotingPanelTabOpened = this.cookieService.get('isVotingPanelTabOpened') == 'true';

    // if(!this.isVotingPanelTabOpened){
      this.cookieService.set('isVotingPanelTabOpened', 'true');
      window.open(`/painel-votacao/${type}`, "_blank");
    // }
  }

  chosenViewDividerVotation() {
    this.isDialogVotationFlexOpened = true;
    this.isDialogVotationOpened = false;
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
          this.fillRoleInSessionLists(this.townhall.tableRoleList);
          this.onCancelar();
          this.loading = false;
          this.form.get('id').enable();
          this.sessionUUID = this.session.uuid;

          this.secondInterval = setInterval(() => {
            this.findSessionByUUID(this.session.uuid);
            this.computeSessionVoting();
          }, 5000);
        },
        error: err => {
          this.messageService.add({key: 'bc', severity:'error', summary:'Erro!', detail:err.error.description});
          this.onCancelar();
          this.loading = false;
        }
      });
  }

  deleteSession(){
    this.showDeleteSessionDialog = false;
    this.sessionService.delete(this.session.uuid).subscribe({
      next: data => {
        clearInterval(this.firstInterval);
        clearInterval(this.secondInterval);

        this.cookieService.delete('session-uuid');
        this.cookieService.delete('playInVoting');
        this.cookieService.delete('playCloseVoting');

        this.existsSession = false;
        this.session = new Session();

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Sessão deletada com sucesso'
        });
      },
      error: error => {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Erro!',
          detail: error.error.description
        });
      }
    });
  }

  onCancelar(){

    this.showDialog = false;
    this.clearInputs();
  }

  onOpeningVoting(){

    this.loading = true;
    let subjectDTOList = this.selectedSubjectList.map((subject) => new SubjectVotingDTO(subject));
    this.sessionService.createVoting(this.session.uuid, subjectDTOList).subscribe({
      next: data => {
        this.session.votingList.push(data);
        this.onHideVotingDialog();
        this.existsOpenVoting = true;
        this.cookieService.set('playInVoting', 'true');
        this.loading = false;
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Votação aberta!'});
      }, error: error => {

        this.selectedSubjectList = [];
        this.onHideVotingDialog();
        this.loading = false;
        this.messageService.add({key: 'bc', severity:'error', summary:'Erro!', detail:error.error.description});
      }

    });

  }

  findSessionByUUID(sessionUUID: string){

    this.sessionService.findByUUID(sessionUUID).subscribe({
      next: data => {
        console.log({ sessionData: data });
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
          this.selectedParlamentarPresenceIdList = [];
        },
        error: error => {
          this.messageService.add({key: 'bc', severity:'error', summary:'Erro!', detail: error.error.message});
          this.selectedParlamentarPresenceIdList = [];
        }
      })
    }
  }

  onTransmitirOther(){

    let parlamentarTimer = new ParlamentarTimer();
    parlamentarTimer.id = 999;
    parlamentarTimer.timeToSpeak = this.selectedTimer.minutes * 60 + this.selectedTimer.seconds;
    this.cookieService.set('parlamentarObject', JSON.stringify(parlamentarTimer));
    localStorage.setItem('parlamentarObject', JSON.stringify(parlamentarTimer));

    this.isShowTimerTabOpened = this.cookieService.get('isShowTimerTabOpened') == 'true';

    this.setExpedient();
    if(!this.isShowTimerTabOpened){

      this.cookieService.set('isShowTimerTabOpened', 'true');
      window.open('/mostrarTempo', "_blank");
    }
  }

  setExpedient() {
    this.cookieService.set('otherExpedient', this.outroExpediente);
    this.cookieService.set('expedientType', this.expediente);
  }

  onTransmitir(parlamentar: Parlamentar){

    if(this.selectedTimer == null){
      this.messageService.add({key: 'bc', severity:'warn', summary:'Inválido!', detail:'Você precisa selecionar uma das opções de tempo antes de transmitir'});
    }else{

      let parlamentarTimer = new ParlamentarTimer();
      parlamentarTimer.buildFromParlamentar(parlamentar);
      parlamentarTimer.timeToSpeak = this.selectedTimer.minutes * 60 + this.selectedTimer.seconds;
      this.cookieService.set('parlamentarObject', JSON.stringify(parlamentarTimer));

      localStorage.setItem('parlamentarObject', JSON.stringify(parlamentarTimer));

      // this.isShowTimerTabOpened = this.cookieService.get('isShowTimerTabOpened') == 'true';
      //
      // if(!this.isShowTimerTabOpened){
      //   this.cookieService.set('isShowTimerTabOpened', 'true');
      //   window.open('/mostrarTempo', "_blank");
      // }
    }
  }

  onAParte(parlamentar: Parlamentar){

    let parlamentarTimer = new ParlamentarTimer();
    parlamentarTimer.buildFromParlamentar(parlamentar);
    parlamentarTimer.timeToSpeak = 120;
    localStorage.setItem('parlamentarAParteObject', JSON.stringify(parlamentarTimer));

    this.cookieService.set('parlamentarAParteObject', JSON.stringify(parlamentarTimer));
  }

  onFinalizarTempo(){
    localStorage.removeItem('parlamentarObject');
    this.cookieService.set('endMainTimer', 'true');
  }

  onFinalizarAParte(){
    localStorage.removeItem('parlamentarAParteObject');
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
    this.disableExpedientDiversos = flag;
    this.setExpedient();
  }

  onTownHallChange(){

    this.showParlamentarImage = false;
    this.parlamentarList = [];
    this.selectedParlamentarPresence = new ParlamentarPresence();
    this.disableParlamentarDropdown = false;
  }


  fillRoleInSessionLists(tableRoleList: TableRole[]): void{

    for(let i = 0; i < tableRoleList.length; i++){

      if(i < 4){
        this.roleInSessionListPart1.push(tableRoleList[i]);
      }else if( i < 8){
        this.roleInSessionListPart2.push(tableRoleList[i]);
      }else if( i < 12){
        this.roleInSessionListPart3.push(tableRoleList[i]);
      }
    }
  }

  closeVoting(){

    this.sessionService.closeVoting(this.session.uuid).subscribe({
      next: res => {
        this.selectedSubjectList = [];
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Votação encerrada!'});
        this.cookieService.set('playCloseVoting', 'true');
      },
      error: err => {
        this.messageService.add({severity:'error', summary:'Erro!', detail: err.error.description});
      }
    });
  }


  async cleanPanel() {
    if (this.someVoting && this.someVoting.id) {
      this.sessionService
        .resetSessionVotingInfoBySessionAndVotingId(this.sessionUUID, this.someVoting.id)
        .subscribe({
          next: (data) => {
            console.log({ findSessionVotingInfoBySessionAndVotingId: data })
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  getFilteredSpeakerList() {
    if (!this.session?.speakerList) return [];
    return this.session.speakerList.filter(speaker =>
      speaker.type === this.selectedSpeakerType
    );
  }
}
