import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ParlamentarPresence } from '../domain/parlamentar-presence.model';
import { Session } from '../domain/session.model';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-voting-panel',
  templateUrl: './voting-panel.component.html',
  styleUrls: ['./voting-panel.component.scss']
})
export class VotingPanelComponent implements OnInit {
  
  session: Session = null;
  firstHalfParlamentarList: ParlamentarPresence[] = new Array();
  secondHalfParlamentarList: ParlamentarPresence[] = new Array();

  constructor(private cookieService: CookieService, private sessionService: SessionService) { }

  ngOnInit(): void {
    
    let sessionUUID = this.cookieService.get('session-uuid');
    if(sessionUUID != undefined && sessionUUID != null){

      setInterval(() => {
        this.findSessionByUUID(sessionUUID);
      }, 3000);
    }
  }

  findSessionByUUID(sessionUUID: string){

    this.sessionService.findByUUID(sessionUUID).subscribe(res => {
      this.session = res;
      console.log(this.session);
      this.splitParlamentarList();
    });
  }

  splitParlamentarList(){
    
    this.firstHalfParlamentarList = [];
    this.secondHalfParlamentarList = [];

    let list = this.session.parlamentarPresenceList;
    for (let i = 0; i < list.length; i++) {
      if(i % 2 != 0){
        this.firstHalfParlamentarList.push(list[i]);
      }else{
        this.secondHalfParlamentarList.push(list[i]);
      }
    }
    
  }

}
