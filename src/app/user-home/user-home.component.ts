import { Component, Inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Parlamentar } from '../domain/parlamentar.model';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';
import { DOCUMENT } from '@angular/common';
import { Session } from '../domain/session.model';
import { SessionParlamentarDTO } from '../dto/session-parlamentar-dto.model';
import { ParlamentarPresenceDTO } from '../dto/parlamentar-presence-dto.model';
import { SpeakerSubscriptionDTO } from '../dto/subscription-speaker.model';
import { Console } from 'console';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  username: string = '';
  parlamentar: Parlamentar = new Parlamentar();
  townHallName: string = "Camara municipal de Caninde";  
  elem: any;
  linkSessao: string = "";
  session: SessionParlamentarDTO;
  existsSession: boolean = false;
  townHallId : number = 0;

  constructor(@Inject(DOCUMENT) private document: any,private userService: UserService, private sessionService: SessionService, private cookieService: CookieService) { }


  ngOnInit(): void {

    this.linkSessao = "https://sapl.caninde.ce.leg.br/sessao/pauta-sessao/83/";
    this.elem = document.documentElement;
    this.townHallId = Number.parseInt( this.cookieService.get('user-townhall-id'));

    this.username = this.cookieService.get('user-username');
    this.userService.findByUsername(this.username).subscribe(res => {
      this.parlamentar = res;
    });


    this.findSessionTodayByTownhall(this.townHallId);    
    
  }

  findSessionTodayByTownhall(townHallId: number){

    this.sessionService.findSessionTodayByTownhall(townHallId).subscribe(res => {      
      if(res != null){
        this.session = res;
        this.updatePresence();
        console.log(this.parlamentar);
        console.log(this.session);
      }
    });
  }

  updatePresence(){

    let parlamentarPresenceDTO = new ParlamentarPresenceDTO(this.parlamentar.id, 'PRESENCE');
    this.sessionService.updateParlamentarPresence(this.session.uuid, parlamentarPresenceDTO).subscribe(() =>{
      console.log('Tudo OK')      ;
    });
  }

  subscriptionInSpeakerList(){
    
    let speakerDTO = new SpeakerSubscriptionDTO(this.townHallId, this.parlamentar.id);
    this.sessionService.subscriptionInSpeakerList(this.session.uuid, speakerDTO).subscribe(res =>{
      console.log(res);
    });
  }

  goToSaplSession(){
    window.open(this.linkSessao, "_blank");
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

}
