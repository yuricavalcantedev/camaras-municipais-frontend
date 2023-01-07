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
import { VoteDTO } from '../dto/vote-dto.model';
import { Voting } from '../domain/voting.model';

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
  existsOpenVoting: boolean = false;
  townHallId : number = 0;
  votingOptions: string[] = [];

  constructor(@Inject(DOCUMENT) private document: any,private userService: UserService, private sessionService: SessionService, private cookieService: CookieService) { }


  ngOnInit(): void {

    this.votingOptions.push('YES');
    this.votingOptions.push('NO');
    this.votingOptions.push('ABSTENTION');

    this.linkSessao = "https://sapl.caninde.ce.leg.br/sessao/pauta-sessao/83/";
    this.townHallId = Number.parseInt( this.cookieService.get('user-townhall-id'));

    this.username = this.cookieService.get('user-username');
    this.userService.findByUsername(this.username).subscribe(res => {
      this.parlamentar = res;
    });


    setInterval(() => {

      this.findSessionTodayByTownhall(this.townHallId);

    }, 3000);

  }

  findSessionTodayByTownhall(townHallId: number){

    this.sessionService.findSessionTodayByTownhall(townHallId).subscribe(res => {      
      if(res != null){
        this.session = res;
        this.checkIfExistsOpenVoting();
        this.updatePresence();
        console.log(this.session);
      }
    });
  }

  checkIfExistsOpenVoting(){
    this.existsOpenVoting = this.session.voting != null && this.session.voting.status == 'VOTING';
    console.log(this.existsOpenVoting);
  }

  updatePresence(){

    let parlamentarPresenceDTO = new ParlamentarPresenceDTO(this.parlamentar.id, 'PRESENCE');
    this.sessionService.updateParlamentarPresence(this.session.uuid, parlamentarPresenceDTO).subscribe(() =>{
      // mostrar alguma mensagem dizendo quer o vereador foi logado com sucesso? console.log('Tudo OK');
    });
  }

  subscriptionInSpeakerList(){
    
    let speakerDTO = new SpeakerSubscriptionDTO(this.townHallId, this.parlamentar.id);
    this.sessionService.subscriptionInSpeakerList(this.session.uuid, speakerDTO).subscribe(res =>{
      console.log(res);
    });
  }

  sendVote(vote: string){
    
    if(this.votingOptions.find(option => option == vote) == undefined){
      //colocar mensagem de erro
      console.error('error!');
    }else{
      
      let parlamentarVotingId = this.findParlamentarVotingId(this.parlamentar.id);
      if(parlamentarVotingId != null){
        let voteDTO = new VoteDTO(parlamentarVotingId, this.parlamentar.id, vote);
        this.sessionService.computeVote(this.session.uuid, voteDTO).subscribe(res => {
          console.log('sounds good!');
        });
      }
    }

  }

  goToSaplSession(){
    window.open(this.linkSessao, "_blank");
  }

  findParlamentarVotingId(parlamentarId: number): number{

    let parlamentarVoting = this.session.voting.parlamentarVotingList.find(p => p.parlamentarId == parlamentarId);
    return parlamentarVoting != null ? parlamentarVoting.id : null;
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
