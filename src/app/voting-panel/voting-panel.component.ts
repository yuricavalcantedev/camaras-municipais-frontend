import { Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Session } from '../domain/session.model';
import { SpeakerSession } from '../domain/speaker-session.model';
import { Voting } from '../domain/voting.model';
import { ParlamentarInfoStatusDTO } from '../dto/parlamentar-info-status-dto.model';
import { SessionService } from '../service/session.service';
import { SoundService } from '../service/sound.service';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-voting-panel',
  templateUrl: './voting-panel.component.html',
  styleUrls: ['./voting-panel.component.scss']
})
export class VotingPanelComponent implements OnInit {

  inFullScren = false;

  parlamentaresTownhall: ParlamentarInfoStatusDTO[] = [];
  voting: Voting;

  yesCounter: number = 0;
  noCounter: number = 0;
  absCounter: number = 0;
  totalCounter: number = 0;

  townHallName: string = '';
  townHallUrlImage: string = '';

  finalResult: string = '';
  votingTitle: string = '';
  votingSubTitle: string = '';
  expedientType: string = '';
  otherExpedient: string = '';

  existsOpenVoting: boolean = false;
  existsClosedVoting: boolean = false;

  session: Session = null;
  speakerList: SpeakerSession[] = [];
  sessionInfoInterval: any;
  getSessionInterval: any;
  townhallId: number;

  TIME_TO_GET_DATA: number = 1500;

  playInVoting: boolean;

  constructor(private cookieService: CookieService,
    private sessionService: SessionService,
    private utilService: UtilService,
    private soundService: SoundService) { }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    this.cookieService.set('isVotingPanelTabOpened', 'false');
    clearInterval(this.sessionInfoInterval);
  }

  ngOnInit(): void {

    if (this.cookieService.get('townHallCityName').length > 0) {
      this.townHallName = this.cookieService.get('townHallCityName');
    }

    if (this.cookieService.get('townHallUrlImage').length > 0) {
      this.townHallUrlImage = this.cookieService.get('townHallUrlImage');
    }

    if (this.cookieService.get('playInVoting')) {
      this.playInVoting = (this.cookieService.get('playInVoting') == 'true');
    }

    this.townhallId = Number(this.cookieService.get('user-townhall-id'));
    let sessionUUID = this.cookieService.get('session-uuid');


    setInterval(() => {

      this.setExpiendType();
      const syncCalling = new Promise<boolean>((resolve, reject) => {
        this.findSessionByUUID(sessionUUID);
        resolve(true);
      });

      syncCalling.then(() => {
        if (this.session != null) {
          if (this.session.votingList.length > 0) {
            this.existsOpenVoting = this.session.votingList.find(voting => voting.status == 'VOTING') != undefined;
            this.existsClosedVoting = this.session.votingList[this.session.votingList.length - 1].status == 'VOTED';
          }
          this.playInVoting = (this.cookieService.get('playInVoting') == 'true');

          if (this.existsOpenVoting && this.playInVoting) {
            this.soundService.playSound("assets/sounds/em_votacao.mp3");
            this.cookieService.set('playInVoting', 'false');
          }
        }

        if (this.existsOpenVoting) {
          this.findSessionVotingInfoByUUID(sessionUUID);
        } else {
          this.setExpiendType();
          this.findSessionStandardInfoByUUID(sessionUUID);
        }
      });
    }, this.TIME_TO_GET_DATA);

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
      next: data => {
        this.session = data;
      }, error: err => {
        console.log(err.error.description);
      }
    });
  }

  extractTitleAndSubTitle(voting: Voting) {

    if (voting != undefined) {
      this.votingTitle = voting.description;
    }
  }

  findSessionVotingInfoByUUID(sessionUUID: string) {

    let condition = this.existsClosedVoting ? 'VOTED' : 'VOTING';
    this.sessionService.findSessionVotingInfoByUUID(sessionUUID, condition).subscribe({
      next: data => {

        this.parlamentaresTownhall = data.parlamentarTableList.concat(data.parlamentarList)
        this.voting = data.voting;
        this.speakerList = data.speakerList;
        this.computePartialVotes();
        this.extractTitleAndSubTitle(data.voting);
        console.log({ parlamentaresTownhall: this.parlamentaresTownhall })
      }, error: error => {
        console.log(error);
      }
    });
  }

  findSessionStandardInfoByUUID(sessionUUID: string) {

    this.sessionService.findSessionStandardInfoByUUID(sessionUUID).subscribe({

      next: data => {
        this.parlamentaresTownhall = data.parlamentarTableList.concat(data.parlamentarList)
        this.voting = data.voting;
        this.speakerList = data.speakerList;
        this.votingTitle = '';
        this.votingSubTitle = '';
        console.log({ parlamentaresTownhall: this.parlamentaresTownhall })
      }, error: error => {
        console.log(error);
      }
    });
  }

  computePartialVotes() {

    this.yesCounter = 0;
    this.noCounter = 0;
    this.absCounter = 0;


    this.parlamentaresTownhall.forEach(parlamentar => {
      switch (parlamentar.result) {
        case 'YES': this.yesCounter++;
          break;
        case 'NO': this.noCounter++;
          break;
        case 'ABSTENTION': this.absCounter++;
          break;
      }
    });

    this.totalCounter = this.parlamentaresTownhall.length;

  }

}
