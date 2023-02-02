import { Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Session } from '../domain/session.model';
import { SpeakerSession } from '../domain/speaker-session.model';
import { Voting } from '../domain/voting.model';
import { ParlamentarInfoStatusDTO } from '../dto/parlamentar-info-status-dto.model';
import { SessionService } from '../service/session.service';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-voting-panel',
  templateUrl: './voting-panel.component.html',
  styleUrls: ['./voting-panel.component.scss']
})
export class VotingPanelComponent implements OnInit {

  inFullScren = false

  parlamentaresTable: ParlamentarInfoStatusDTO[] = [];
  parlamentaresTownhall: ParlamentarInfoStatusDTO[] = [];
  voting: Voting;

  yesCounter: number = 0;
  noCounter: number = 0;
  absCounter: number = 0;
  totalCounter: number = 0;

  townHallName: string = '';
  townHallUrlImage: string = '';

  finalResult: string = '';
  votingTitle:string = '';
  votingSubTitle: string = '';
  expedientType: string = '';

  existsOpenVoting: boolean = false;
  session: Session = null;
  speakerList: SpeakerSession[] = [];
  sessionInfoInterval: any;
  getSessionInterval: any;
  townhallId: number;

  TIME_TO_GET_DATA: number = 1500;



  constructor(private cookieService: CookieService, private sessionService: SessionService, private utilService: UtilService) { }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    this.cookieService.set('isVotingPanelTabOpened', 'false');
    clearInterval(this.sessionInfoInterval);
  }

  ngOnInit(): void {

    if(this.cookieService.get('townHallCityName').length > 0){
      this.townHallName = this.cookieService.get('townHallCityName');
    }

    if(this.cookieService.get('townHallUrlImage').length > 0){
      this.townHallUrlImage = this.cookieService.get('townHallUrlImage');
    }

    if(this.cookieService.get('expedientType').length > 0){
      this.expedientType = this.cookieService.get('expedientType');
    }

    this.townhallId = Number(this.cookieService.get('user-townhall-id'));
    let sessionUUID = this.cookieService.get('session-uuid');


    setInterval(() =>{

      const syncCalling = new Promise<boolean>((resolve, reject) => {
        this.findSessionByUUID(sessionUUID);
        resolve(true);
      });

      syncCalling.then(() => {

        if(this.session != null){
          this.existsOpenVoting = this.session.votingList.find(voting => voting.status == 'VOTING') != undefined;
        }

        if(this.existsOpenVoting){
          this.findSessionVotingInfoByUUID(sessionUUID);
        }else if (!this.existsOpenVoting){
          this.findSessionStandardInfoByUUID(sessionUUID);
        }
      });
    }, this.TIME_TO_GET_DATA);

  }
  fullScreen() {
    this.utilService.fullScreen();
  }

  findSessionByUUID(sessionUUID: string) {

    this.sessionService.findByUUID(sessionUUID).subscribe({
      next: data => {
          this.session = data;
      }, error: err => {
        console.log(err);
      }
    });
  }

  extractTitleAndSubTitle(){

    let titleSplittedFirstHalf = this.session.votingList[0].subjectList[0].description.split('nº');
    this.votingTitle = titleSplittedFirstHalf[0].split('-')[1];
    if(this.session.subjectList.length > 1){
      this.votingSubTitle = 'Mocao em bloco';
    }else{
      this.votingSubTitle = this.session.subjectList[0].description;
    }

  }

  findSessionVotingInfoByUUID(sessionUUID: string){

    this.sessionService.findSessionVotingInfoByUUID(sessionUUID).subscribe({
      next: data => {

        this.parlamentaresTable = data.parlamentarTableList;
        this.parlamentaresTownhall = data.parlamentarList;
        this.voting = data.voting;
        this.speakerList = data.speakerList;
        this.computePartialVotes();
        this.extractTitleAndSubTitle();
        console.log(this.parlamentaresTable);
        console.log(this.parlamentaresTownhall);
      }, error: error => {
        console.log(error);
      }
    });
  }

  findSessionStandardInfoByUUID(sessionUUID:string){

    this.sessionService.findSessionStandardInfoByUUID(sessionUUID).subscribe({

      next: data => {
        this.parlamentaresTable = data.parlamentarTableList;
        this.parlamentaresTownhall = data.parlamentarList;
        this.voting = data.voting;
        this.speakerList = data.speakerList;
        this.votingTitle = '';
        this.votingSubTitle = '';
        console.log(this.parlamentaresTable);
        console.log(this.parlamentaresTownhall);
      }, error: error => {
        console.log(error);
      }
    });
  }

  computePartialVotes(){

    this.yesCounter = 0;
    this.noCounter = 0;
    this.absCounter = 0;

    this.parlamentaresTable.forEach(parlamentar => {
      switch(parlamentar.result){
        case 'YES': this.yesCounter++;
        break;
        case 'NO': this.noCounter++;
        break;
        case 'ABSTENTION': this.absCounter++;
        break;
      }
    });

    this.parlamentaresTownhall.forEach(parlamentar => {
      switch(parlamentar.result){
        case 'YES': this.yesCounter++;
        break;
        case 'NO': this.noCounter++;
        break;
        case 'ABSTENTION': this.absCounter++;
        break;
      }
    });

    this.totalCounter = this.parlamentaresTable.length + this.parlamentaresTownhall.length;

  }

}
