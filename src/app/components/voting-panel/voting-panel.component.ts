import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Session } from '../../domain/session.model';
import { SpeakerSession } from '../../domain/speaker-session.model';
import { Voting } from '../../domain/voting.model';
import { ParlamentarInfoStatusDTO } from '../../dto/parlamentar-info-status-dto.model';
import { ParlamentarTimer } from '../../dto/parlamentar-timer.model';
import { EControlType } from '../../dto/control-type.enum';
import { Control } from '../../domain/control.model';
import { SessionService } from '../../service/session.service';
import { SoundService } from '../../service/sound.service';
import { UtilService } from '../../service/util.service';
import { ControlService } from '../../service/control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voting-panel',
  templateUrl: './voting-panel.component.html',
  styleUrls: ['./voting-panel.component.scss'],
})
export class VotingPanelComponent implements OnInit, OnDestroy {
  inFullScren = false;
  loading = false;

  parlamentaresTownhall: ParlamentarInfoStatusDTO[] = [];
  voting: Voting;

  yesCounter: number = 0;
  noCounter: number = 0;
  absCounter: number = 0;
  totalCounter: number = 0;
  presentCounter: number = 0;

  townHallName: string = '';
  townHallUrlImage: string = '';

  finalResult: string = '';
  resultType: string = '';
  votingTitle: string = '';
  votingAuthor: string = '';
  votingSubTitle: string = '';
  visibilityVotingType: string = '';
  expedientType: string = '';
  otherExpedient: string = '';

  existsOpenVoting: boolean = false;
  existsClosedVoting: boolean = false;

  session: Session = new Session();
  speakerList: SpeakerSession[] = [];
  sessionInfoInterval: any;
  getSessionInterval: any;
  townhallId: number;

  TIME_TO_GET_DATA: number = 1500;

  playInVoting: boolean;
  closeVoting: boolean;
  lastVoting: number;

  controllList: Control[] = null;
  ONE_SECOND: number = 1000;

  countdown: number;
  countdownAparte: number;
  timerInterval: any;
  timerIntervalAparte: any;
  timeLeft: string;
  timeAparteLeft: string;
  parlamentaryData: ParlamentarTimer;
  parlamentaryAParteData: ParlamentarTimer;
  countdownRunning = false;
  countdownAparteRunning = false;
  isAParteActive: boolean = false;

  constructor(
    private cookieService: CookieService,
    private sessionService: SessionService,
    private utilService: UtilService,
    private soundService: SoundService,
    private controlService: ControlService,
    private router: Router) { }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    this.clearIntervalAndCookie();
  }

  padWithLeadingZeros(num: number, totalLength: number) {
    return String(num).padStart(totalLength, '0');
  }

  ngOnInit(): void {
    if (this.cookieService.get('townHallCityName').length > 0) {
      this.townHallName = this.cookieService.get('townHallCityName');
    }

    if (this.cookieService.get('townHallUrlImage').length > 0) {
      this.townHallUrlImage = this.cookieService.get('townHallUrlImage');
    }

    if (this.cookieService.get('playInVoting')) {
      this.playInVoting = this.cookieService.get('playInVoting') == 'true';
    }

    this.townhallId = Number(this.cookieService.get('user-townhall-id'));
    let sessionUUID = this.cookieService.get('session-uuid');

    window.addEventListener('storage', (event) => {
      if (event.key === 'parlamentarObject') {
        this.handleStorageEvent(event, 'parlamentary');
      } else if (event.key === 'parlamentarAParteObject') {
        this.handleStorageEvent(event, 'parlamentaryAParte');
      }
    });

    this.restoreActiveTimersFromStorage();

    setInterval(() => {
      if (this.countdownRunning) {
        this.controlService.findByTypeAndParlamentarIdAll(EControlType.TIME, this.townhallId.toString()).subscribe({
          next: (res) => {
            this.controllList = res.sort((a, b) => b.id - a.id);
            if (this.controllList && this.controllList.length > 0) {
              let currentMinutes = Math.floor(this.countdown / 60);
              currentMinutes = this.handleControlList(currentMinutes);
              this.countdown = currentMinutes * 60 + (this.countdown % 60);
              this.updateTimeLeft('parlamentary');
            }
          },
          error: (err) => {
            console.error('Erro ao buscar controles:', err);
          }
        });
      }
    }, 3000);

    this.sessionInfoInterval = setInterval(() => {

      this.setExpiendType();
      const syncCalling = new Promise<boolean>((resolve, reject) => {
        this.findSessionByUUID(sessionUUID);
        resolve(true);
      });

      syncCalling.then(() => {
        if (this.session != null) {
          this.existsOpenVoting =
            this.session.votingList.find(
              (voting) => voting.status == 'VOTING'
            ) != undefined;
          this.existsClosedVoting =
            this.session.votingList.length == 0
              ? false
              : this.session.votingList[this.session.votingList.length - 1]
                  .status == 'VOTED';
        }

        let votingId;

        this.playInVoting = this.cookieService.get('playInVoting') == 'true';
        this.closeVoting = this.cookieService.get('playCloseVoting') == 'true';

        if (this.existsOpenVoting && this.playInVoting) {
          this.soundService.playSound('assets/sounds/em_votacao.mp3');
          this.cookieService.set('playInVoting', 'false');
        }

        if (!this.existsOpenVoting && this.closeVoting) {
          this.soundService.playSound('assets/sounds/votacao_encerrada.mp3');
          this.cookieService.set('playCloseVoting', 'false');
        }

        if (this.existsOpenVoting) {
          votingId = this.session.votingList.find(
            (voting) => voting.status == 'VOTING'
          ).id;
          this.lastVoting = votingId;
          this.findSessionVotingInfoBySessionAndVotingId(sessionUUID, votingId);
        } else if (this.existsClosedVoting) {
          votingId =
            this.session.votingList[this.session.votingList.length - 1].id;
            console.log("Sessao", this.session);
            console.log("Id da ultima votacao", votingId);
          this.findSessionVotingInfoBySessionAndVotingId(sessionUUID, this.lastVoting);
        } else {
          this.setExpiendType();
          this.findSessionStandardInfoByUUID(sessionUUID);
        }
      });
    }, this.TIME_TO_GET_DATA);

    window.onload = () => {
      this.fullScreen();
    };

  }

  setLoading(state: boolean) {
    this.loading = state;
  }

  private setExpiendType() {
    if (this.cookieService.get('expedientType').length > 0) {
      this.expedientType = this.cookieService.get('expedientType');
    }
    if (this.cookieService.get('otherExpedient').length > 0) {
      this.otherExpedient = this.cookieService.get('otherExpedient');
    }
  }

  fullScreen() {
    this.utilService.fullScreen();
  }

  findSessionByUUID(sessionUUID: string) {
    this.sessionService.findByUUID(sessionUUID).subscribe({
      next: (data) => {
        this.session = data;
      },
      error: (err) => {
        console.log(err.error.description);
      },
    });
  }

  extractTitleAndSubTitle(voting: Voting) {
    if (voting != undefined) {
      this.votingTitle = voting.description;
      this.votingSubTitle = voting.subDescription
    }
  }

  extractAuthor(voting: Voting) {
    if (voting != undefined) {
      this.votingAuthor = voting.author;
    }
  }

  extractResultFromVoting(voting: Voting) {
    if (voting != undefined) {
      this.resultType =
        voting.result != null ? this.voting.result.split('-')[0].trim() : '';
      this.finalResult = this.voting.result;
    }
  }

  findSessionVotingInfoBySessionAndVotingId(sessionUUID: string, votingId: number) {
    this.sessionService
      .findSessionVotingInfoBySessionAndVotingId(sessionUUID, votingId)
      .subscribe({
        next: (data) => {
          this.parlamentaresTownhall = data.parlamentarTableList.concat(
            data.parlamentarList
          );
        this.voting = data.voting;
        this.speakerList = data.speakerList;
        this.visibilityVotingType = this.voting.legislativeSubjectType.visibilityType;
        this.computePartialVotes();
        this.extractTitleAndSubTitle(data.voting);
        this.extractAuthor(data.voting);
        this.extractResultFromVoting(this.voting);

        this.presentCounter = this.parlamentaresTownhall.filter(
            (parlamentar) => parlamentar.status === 'PRESENCE'
          ).length;
        },
        error: (error) => {
        console.log(error);
        },
    });
  }

  findSessionStandardInfoByUUID(sessionUUID: string) {
    this.sessionService.findSessionStandardInfoByUUID(sessionUUID).subscribe({

      next: data => {
        this.parlamentaresTownhall = data.parlamentarTableList.concat(data.parlamentarList);
        this.voting = data.voting;
        this.speakerList = data.speakerList;
        this.votingTitle = '';
        this.votingSubTitle = '';
        this.presentCounter = this.parlamentaresTownhall.filter(
          (parlamentar) => parlamentar.status === 'PRESENCE'
        ).length;

        setTimeout(() => {
          this.loading = false;
        }, 2000);

      }, error: error => {
        this.clearIntervalAndCookie();
        this.router.navigate(['townhallSettings/' + this.townhallId],
        {queryParams: {
          errorCode: 4001
        }});
      }
    });
  }

  computePartialVotes() {
    this.yesCounter = 0;
    this.noCounter = 0;
    this.absCounter = 0;

    this.parlamentaresTownhall.forEach((parlamentar) => {
      switch (parlamentar.result) {
        case 'YES':
          this.yesCounter++;
          break;
        case 'NO':
          this.noCounter++;
          break;
        case 'ABSTENTION':
          this.absCounter++;
          break;
      }
    });

    this.totalCounter = this.parlamentaresTownhall.length;
  }

  clearIntervalAndCookie(){
    clearInterval(this.sessionInfoInterval);
    this.cookieService.set('isVotingPanelTabOpened', 'false');
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.timerIntervalAparte) {
      clearInterval(this.timerIntervalAparte);
    }
  }

  deleteControlTime(id: number) {
    this.controlService.delete(id).subscribe({
      next: data => {
        console.log({ deleteControlTime: data });
      },
      error: error => {
        console.error({ deleteControlTime: error });
      }
    });
  }

  private handleControlList(minutes: number) {
    if (!this.controllList) return minutes;

    this.controllList.forEach((control, index) => {
      if (control.command === 'add') {
        minutes += 1;
      } else if (control.command === 'remove') {
        if (minutes >= 1) {
          minutes -= 1;
        }
      }
      this.controllList.splice(index, 1);
      this.deleteControlTime(control.id);
    });

    return minutes;
  }

  private restoreActiveTimersFromStorage() {
    const parlamentarRaw = localStorage.getItem('parlamentarObject');
    if (parlamentarRaw) {
      const parsedData = JSON.parse(parlamentarRaw);
      if (parsedData?.id && parsedData.timeToSpeak != null) {
        this.parlamentaryData = parsedData;
        this.startTimer('parlamentary');
      }
    }

    const aparteRaw = localStorage.getItem('parlamentarAParteObject');
    if (aparteRaw) {
      const parsedData = JSON.parse(aparteRaw);
      if (parsedData?.id && parsedData.timeToSpeak != null) {
        this.parlamentaryAParteData = parsedData;
        this.startTimer('parlamentaryAParte');
      }
    }
  }

  startTimer(timerType: string) {
    if (timerType === 'parlamentary') {
      if (this.isAParteActive) {
        return;
      }
      this.countdownRunning = true;
      this.countdown = this.parlamentaryData?.timeToSpeak || 0;
      this.updateTimeLeft('parlamentary');

      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      this.timerInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
          if (this.countdown == 30 || this.countdown == 59 || this.countdown == 120) {
            this.soundService.playSound('assets/sounds/warning_sound.mp3');
          }
          this.updateTimeLeft('parlamentary');
        } else {
          this.handleTimerEnd('parlamentary');
        }
      }, 1000);
    } else if (timerType === 'parlamentaryAParte') {
      this.countdownAparteRunning = true;
      this.countdownAparte = this.parlamentaryAParteData?.timeToSpeak || 0;
      this.updateTimeLeft('parlamentaryAParte');

      if (this.timerIntervalAparte) {
        clearInterval(this.timerIntervalAparte);
      }

      this.timerIntervalAparte = setInterval(() => {
        if (this.countdownAparte > 0) {
          this.countdownAparte--;
          this.updateTimeLeft('parlamentaryAParte');
        } else {
          this.handleTimerEnd('parlamentaryAParte');
        }
      }, 1000);
    }
  }

  updateTimeLeft(timerType: string) {
    if (timerType === 'parlamentary') {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      this.timeLeft = `${this.padWithLeadingZeros(minutes, 2)}:${this.padWithLeadingZeros(seconds, 2)}`;
    } else if (timerType === 'parlamentaryAParte') {
      const minutes = Math.floor(this.countdownAparte / 60);
      const seconds = this.countdownAparte % 60;
      this.timeAparteLeft = `${this.padWithLeadingZeros(minutes, 2)}:${this.padWithLeadingZeros(seconds, 2)}`;
    }
  }

  handleTimerEnd(timerType: string) {
    this.soundService.playSound('assets/sounds/main_sound.mp3');
    if (timerType === 'parlamentary') {
      clearInterval(this.timerInterval);
      localStorage.removeItem('parlamentarObject');
      this.countdownRunning = false;
    } else if (timerType === 'parlamentaryAParte') {
      clearInterval(this.timerIntervalAparte);
      localStorage.removeItem('parlamentarAParteObject');
      this.countdownAparteRunning = false;
      this.isAParteActive = false;
    }

    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  handleStorageEvent(event: StorageEvent, timerType: string) {
    const parsedData = JSON.parse(event.newValue || '{}');

    if (parsedData && parsedData.id && parsedData.timeToSpeak != null) {
      if (timerType === 'parlamentary') {
        this.parlamentaryData = parsedData;
        this.startTimer('parlamentary');
      } else if (timerType === 'parlamentaryAParte') {
        this.parlamentaryAParteData = parsedData;
        this.startTimer('parlamentaryAParte');
      }
    } else if (event.newValue === null) {
      this.handleTimerEnd(timerType);
    } else {
      console.warn('Invalid object received:', parsedData);
    }
  }

}
