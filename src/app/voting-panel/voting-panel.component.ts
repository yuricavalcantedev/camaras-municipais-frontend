import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Session } from '../domain/session.model';
import { Voting } from '../domain/voting.model';
import { ParlamentarInfoStatusDTO } from '../dto/parlamentar-info-status-dto.model';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-voting-panel',
  templateUrl: './voting-panel.component.html',
  styleUrls: ['./voting-panel.component.scss']
})
export class VotingPanelComponent implements OnInit {


  status = "NO"
  parlamentaresTable: ParlamentarInfoStatusDTO[] = [];
  parlamentaresTownhall: ParlamentarInfoStatusDTO[] = [];
  voting: Voting;

  yesCounter: number = 0;
  noCounter: number = 0;
  absCounter: number = 0;
  finalResult: string = '';

  session: Session = null;

  constructor(private cookieService: CookieService, private sessionService: SessionService) { }

  ngOnInit(): void {

    let sessionUUID = this.cookieService.get('session-uuid');
    if(sessionUUID != undefined && sessionUUID != null){

      setInterval(() => {
        this.findSessionVotingInfoByUUID(sessionUUID);
      }, 3000);
    }
  }

  findSessionByUUID(sessionUUID: string){

    this.sessionService.findByUUID(sessionUUID).subscribe(res => {
      this.session = res;
    });
  }

  findSessionVotingInfoByUUID(sessionUUID: string){
    this.sessionService.findSessionVotingInfoByUUID(sessionUUID).subscribe(res => {
      console.log(res);
      this.parlamentaresTable = res.parlamentarTableList;
      this.parlamentaresTownhall = res.parlamentarList;
      this.voting = res.voting;
      this.computePartialVotes();
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

  }

}
