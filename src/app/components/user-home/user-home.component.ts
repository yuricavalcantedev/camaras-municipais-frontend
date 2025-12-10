import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from '../../service/session.service';
import { UserService } from '../../service/user.service';
import { SessionParlamentarDTO } from '../../dto/session-parlamentar-dto.model';
import { ParlamentarPresenceDTO } from '../../dto/parlamentar-presence-dto.model';
import { SpeakerSubscriptionDTO } from '../../dto/subscription-speaker.model';
import { VoteDTO } from '../../dto/vote-dto.model';
import { MessageService } from 'primeng/api';
import { UtilService } from '../../service/util.service';
import { Voting } from '../../domain/voting.model';
import { Router } from '@angular/router';
import { ParlamentarShortDTO } from '../../dto/parlamentar-short-dto.model';
import { TownHallService } from '../../service/townhall.service';
import { ParlamentarTimer } from 'src/app/dto/parlamentar-timer.model';
import { ControlService } from 'src/app/service/control.service';
import { ControlDTO } from 'src/app/dto/control-dto.model';
import { EControlType } from 'src/app/dto/control-type.enum';
import { debounceTime, filter, fromEvent, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  username: string = '';
  parlamentar: ParlamentarShortDTO = new ParlamentarShortDTO();
  townHallCityName: string = '';
  townHallUrlImage: string = '';
  linkSessao: string = '';
  session: SessionParlamentarDTO;
  existsSession: boolean = false;
  existsOpenVoting: boolean = false;
  userHasVoted: boolean = false;
  townHallId: number = 0;
  votingOptions: string[] = [];
  voting: Voting;
  lastVotingId: number = 0;
  disableYesButton: boolean = false;
  disableNoButton: boolean = false;
  disableAbstentionButton: boolean = false;
  hasUpdatedPresence: boolean = false;

  showExpedienteDialog: boolean = false;
  showUnsubscribeDialog: boolean = false;

  votingTitle: string = '';
  parlamentarUserType = 'P';
  isShowTimerTabOpened = false;
  showOptionsDialog = false;
  endMainTimer: boolean = false;
  parlamentarObject: ParlamentarTimer = null;
  selectedVote: string;
  showTimeControlDialog: boolean = false;

  private fullscreenSubscription: Subscription;
  private resizeSubscription: Subscription;
  private orientationSubscription: Subscription;
  private checkFullscreenInterval: Subscription;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private sessionService: SessionService,
    private cookieService: CookieService,
    public townHallService: TownHallService,
    private router: Router,
    private utilService: UtilService,
    private controlService: ControlService
  ) {}

  loading: boolean = false;

  private isMobileDevice(): boolean {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(navigator.userAgent) || window.innerWidth <= 768;
  }

  private isInFullscreen(): boolean {
    return !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );
  }

  private setupFullscreenMonitoring(): void {
    if (!this.isMobileDevice()) return;

    this.fullscreenSubscription = fromEvent(document, 'fullscreenchange')
      .pipe(debounceTime(250))
      .subscribe(() => {
        if (!this.isInFullscreen()) {
          this.utilService.fullScreen();
        }
      });

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(250),
        filter(() => this.isMobileDevice())
      )
      .subscribe(() => {
        if (!this.isInFullscreen()) {
          this.utilService.fullScreen();
        }
      });

    this.orientationSubscription = fromEvent(window, 'orientationchange')
      .pipe(debounceTime(250))
      .subscribe(() => {
        if (!this.isInFullscreen()) {
          setTimeout(() => this.utilService.fullScreen(), 100);
        }
      });

    this.checkFullscreenInterval = interval(2000)
      .pipe(
        filter(() => this.isMobileDevice() && !this.isInFullscreen())
      )
      .subscribe(() => {
        this.utilService.fullScreen();
      });
  }

  ngOnInit(): void {
    this.session = new SessionParlamentarDTO();
    this.votingOptions.push('YES');
    this.votingOptions.push('NO');
    this.votingOptions.push('ABSTENTION');

    this.setupFullscreenMonitoring();

    if (this.isMobileDevice()) {
      setTimeout(() => this.utilService.fullScreen(), 100);
    }

    this.townHallId = Number.parseInt(
      this.cookieService.get('user-townhall-id')
    );
    this.townHallService.getById(this.townHallId).subscribe({
      next: (townHall) => {
        this.townHallCityName = townHall.name;
        this.townHallUrlImage = townHall.urlImage;
        this.cookieService.set('townHallCityName', this.townHallCityName);
        this.cookieService.set('townHallUrlImage', this.townHallUrlImage);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Aconteceu algum erro inesperado!',
        });
      },
    });

    this.username = this.cookieService.get('user-username');
    this.userService.findByUsername(this.username).subscribe((res) => {
      this.parlamentar = res;
    });

    setInterval(() => {
      this.findSessionTodayByTownhall(this.townHallId);
    }, 3000);

    setInterval(() => {
      this.endMainTimer = this.cookieService.get('endMainTimer') == 'true';
      this.parlamentarObject =
        this.cookieService.get('parlamentarObject') !== ''
          ? JSON.parse(this.cookieService.get('parlamentarObject'))
          : null;
      console.log(this.parlamentarObject);
    }, 1000);

    if (this.isMobileDevice()) {
      setTimeout(() => {
        this.utilService.fullScreen();
      }, 100);
    }

    window.addEventListener('orientationchange', () => {
      if (this.isMobileDevice()) {
        setTimeout(() => {
          this.utilService.fullScreen();
        }, 100);
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('orientationchange', () => {
      if (this.isMobileDevice()) {
        this.utilService.fullScreen();
      }
    });

    this.fullscreenSubscription?.unsubscribe();
    this.resizeSubscription?.unsubscribe();
    this.orientationSubscription?.unsubscribe();
    this.checkFullscreenInterval?.unsubscribe();
  }

  logOut() {
    this.updatePresence('OTHER');
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

  showDialog() {
    this.router.navigate(['lista-oradores']);
  }

  hideOptionsDialog() {
    this.showOptionsDialog = false;
  }

  findSessionTodayByTownhall(townHallId: number) {
    this.sessionService.findSessionTodayByTownhall(townHallId).subscribe(
      (res) => {
        if (res != null) {
          this.session = res;
          this.voting = this.session.voting;
          this.linkSessao = this.session.sessionSubjectURL;

          if (this.voting && this.voting.id !== this.lastVotingId) {
            this.selectedVote = null;
            this.userHasVoted = false;
            this.lastVotingId = this.voting.id;
          }

          this.existsOpenVoting =
            this.voting != null && this.session.voting.status == 'VOTING';

          if (this.voting == null) {
            this.userHasVoted = false
            this.selectedVote = null;
            this.disableAbstentionButton = false;
            this.disableNoButton = false;
            this.disableYesButton = false;
          }

          if (!this.hasUpdatedPresence) {
            this.updatePresence('PRESENCE');
          }

          if (this.existsOpenVoting) {
            this.votingTitle = this.voting.description;
          } else {
            this.votingTitle = '';
            this.selectedVote = null;
          }
        }
      },
      (error) => {}
    );
  }

  updatePresence(status: string) {
    
    let parlamentarPresenceDTO = new ParlamentarPresenceDTO(this.parlamentar.id, status);
    this.sessionService
      .updateParlamentarPresence(this.session.uuid, parlamentarPresenceDTO)
      .subscribe(() => {
        this.hasUpdatedPresence = true;
      });
  }

  openExpedienteDialog(param: boolean) {
    this.showExpedienteDialog = param;
  }

  subscriptionInSpeakerList(expedienteType: string) {
    let speakerDTO = new SpeakerSubscriptionDTO(
      this.townHallId,
      this.parlamentar.id,
      expedienteType
    );
    this.sessionService
      .subscriptionInSpeakerList(this.session.uuid, speakerDTO)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            key: 'bc',
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Inscrição feita com sucesso!',
          });
        },
        error: (err) => {
          this.messageService.add({
            key: 'bc',
            severity: 'error',
            summary: 'Erro!',
            detail: 'Ocorreu um erro inesperado, contate o administrador.',
          });
        },
      });
      this.openExpedienteDialog(false);
  }

  openUnsubscribeDialog(param: boolean) {
    this.showUnsubscribeDialog = param;
  }

  unSubscribeSpeaker(expedienteType: string) {
    this.sessionService
      .unsubscribeSpeaker(this.session.uuid, this.parlamentar.id, expedienteType)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            key: 'bc',
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Unsubscribe feita com sucesso!',
          });
        },
        error: (err) => {
          this.messageService.add({
            key: 'bc',
            severity: 'error',
            summary: 'Erro!',
            detail: 'Ocorreu um erro inesperado, contate o administrador.',
          });
        },
      });
      this.openUnsubscribeDialog(false);
  }

  sendVote(vote: string) {
    this.selectedVote = vote;
    if (this.votingOptions.find((option) => option == vote) == undefined) {
      this.messageService.add({
        key: 'bc',
        severity: 'error',
        summary: 'Erro!',
        detail: 'Opcao de voto invalida!',
      });
    } else {
      let parlamentarVotingId = this.findParlamentarVotingId(
        this.parlamentar.id
      );
      if (parlamentarVotingId != null) {
        let voteDTO = new VoteDTO(
          parlamentarVotingId,
          this.parlamentar.id,
          vote
        );

        this.sessionService.computeVote(this.session.uuid, voteDTO).subscribe({
          next: (data) => {
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'Seu voto foi contabilizado com exito!',
            });
            this.userHasVoted = true;
            this.lastVotingId = this.session.voting.id;
          },
          error: (err) => {
            this.messageService.add({
              key: 'bc',
              severity: 'error',
              summary: 'Erro!',
              detail: 'Ocorreu um erro inesperado, contate o administrador.',
            });
          },
        });
      }
    }
  }

  isVoteSelected(vote: string): boolean {
    return this.selectedVote === vote;
  }

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['home']);
  }

  goToSaplSession() {
    window.open(this.linkSessao, '_blank');
  }

  findParlamentarVotingId(parlamentarId: number): number {
    let parlamentarVoting = this.session.voting.parlamentarVotingList.find(
      (p) => p.parlamentarId == parlamentarId
    );
    return parlamentarVoting != null ? parlamentarVoting.id : null;
  }

  fullScreen() {
    this.utilService.fullScreen();
  }

  getColor(button: string) {
    if (!this.existsOpenVoting) {
      return 'gray';
    }

    if (this.disableYesButton && button == 'YES') {
      return 'gray';
    } else if (!this.disableYesButton && button == 'YES') {
      return '#4bc853';
    }

    if (this.disableNoButton && button == 'NO') {
      return 'gray';
    } else if (!this.disableYesButton && button == 'NO') {
      return '#eb606b';
    }

    if (this.disableAbstentionButton && button == 'ABSTENTION') {
      return 'gray';
    } else if (!this.disableYesButton && button == 'ABSTENTION') {
      return '#fbcb60';
    }

    return '';
  }


  handleShowOptionDialog() {
    this.showOptionsDialog = true;
  }

  handleControl(controlDTO: ControlDTO) {
    this.controlService.create(controlDTO).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Control criado incrementado com sucesso!',
        });
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocorreu um erro',
          detail: error.error.description,
        });
        this.loading = false;
      },
    });
  }

  handleAddTimeDialog() {
    const controlDTO = new ControlDTO(
      EControlType.TIME,
      'add',
      this.townHallId.toString()
    );
    this.handleControl(controlDTO);
  }

  handlerRemoveTimeDialog() {
    const controlDTO = new ControlDTO(
      EControlType.TIME,
      'remove',
      this.townHallId.toString()
    );
    this.handleControl(controlDTO);
  }

  handleFinishVotingDialog() {}

  clearOptionsDialog() {
    this.showOptionsDialog = false;
  }

  closeVoting() {
    this.sessionService.closeVoting(this.session.uuid).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Votação encerrada!',
        });
        this.cookieService.set('playVoting', 'true');
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: err.error.description,
        });
      },
    });
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return 'Bom dia';
    } else if (hour >= 12 && hour < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }

}
