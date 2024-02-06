import { Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Session } from '../../domain/session.model';
import { SpeakerSession } from '../../domain/speaker-session.model';
import { Voting } from '../../domain/voting.model';
import { ParlamentarInfoStatusDTO } from '../../dto/parlamentar-info-status-dto.model';
import { SessionService } from '../../service/session.service';
import { SoundService } from '../../service/sound.service';
import { UtilService } from '../../service/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voting-panel',
  templateUrl: './voting-panel.component.html',
  styleUrls: ['./voting-panel.component.scss'],
})
export class VotingPanelComponent implements OnInit {
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

  constructor(
    private cookieService: CookieService,
    private sessionService: SessionService,
    private utilService: UtilService,
    private soundService: SoundService,
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

        console.log(this.session.votingList);
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
      this.votingTitle = voting.legislativeSubjectType.title;
      this.votingSubTitle = voting.description;
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

  findSessionVotingInfoBySessionAndVotingId(
    sessionUUID: string,
    votingId: number
  ) {
    this.sessionService
      .findSessionVotingInfoBySessionAndVotingId(sessionUUID, votingId)
      .subscribe({
        next: (data) => {
          this.parlamentaresTownhall = data.parlamentarTableList.concat(
            data.parlamentarList
          );
        this.voting = data.voting;
        this.speakerList = data.speakerList;
          this.visibilityVotingType =
            this.voting.legislativeSubjectType.visibilityType;
        this.computePartialVotes();
        this.extractTitleAndSubTitle(data.voting);
        this.extractAuthor(data.voting);
        this.extractResultFromVoting(this.voting);

          console.log(this.parlamentaresTownhall);
          console.log(this.voting);

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

}
