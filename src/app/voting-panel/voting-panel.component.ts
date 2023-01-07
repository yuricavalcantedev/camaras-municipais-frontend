import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ParlamentarPresence } from '../domain/parlamentar-presence.model';
import { RoleInSession } from '../domain/role-session.model';
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
  roleInSessionListPart1: RoleInSession[] = new Array();
  roleInSessionListPart2: RoleInSession[] = new Array();
  roleInSessionListPart3: RoleInSession[] = new Array();

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
      this.splitParlamentarList();
      this.fillRoleInSessionLists(this.session.roleInSessionList);
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

    console.log(this.roleInSessionListPart1);
    console.log(this.roleInSessionListPart2);
    console.log(this.roleInSessionListPart3);

  }

}
