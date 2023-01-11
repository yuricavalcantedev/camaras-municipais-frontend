import { Component, Inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Parlamentar } from '../domain/parlamentar.model';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';
import { DOCUMENT } from '@angular/common';
import { SessionParlamentarDTO } from '../dto/session-parlamentar-dto.model';
import { ParlamentarPresenceDTO } from '../dto/parlamentar-presence-dto.model';
import { SpeakerSubscriptionDTO } from '../dto/subscription-speaker.model';
import { VoteDTO } from '../dto/vote-dto.model';
import { MessageService } from 'primeng/api';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  username: string = '';
  parlamentar: Parlamentar = new Parlamentar();
  townHallName: string = "Camara municipal de Caninde";
  linkSessao: string = "";
  session: SessionParlamentarDTO;
  existsSession: boolean = false;
  existsOpenVoting: boolean = false;
  townHallId : number = 0;
  votingOptions: string[] = [];

  constructor(private userService: UserService, private messageService: MessageService,
  private sessionService: SessionService, private cookieService: CookieService, private utilService: UtilService) { }


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
    }, error => {
      console.log(error);
    });
  }

  checkIfExistsOpenVoting(){
    this.existsOpenVoting = this.session.voting != null && this.session.voting.status == 'VOTING';
  }

  updatePresence(){

    let parlamentarPresenceDTO = new ParlamentarPresenceDTO(this.parlamentar.id, 'PRESENCE');
    this.sessionService.updateParlamentarPresence(this.session.uuid, parlamentarPresenceDTO).subscribe(() =>{
      // mostrar alguma mensagem dizendo quer o vereador foi logado com sucesso?
    });
  }

  subscriptionInSpeakerList(){

    let speakerDTO = new SpeakerSubscriptionDTO(this.townHallId, this.parlamentar.id);
    this.sessionService.subscriptionInSpeakerList(this.session.uuid, speakerDTO).subscribe({
      next: data => {
        this.messageService.add({key: 'bc', severity:'success', summary:'Sucesso!', detail:'Seu voto foi contabilizado com exito!'});
      },error: err => {
        this.messageService.add({key: 'bc', severity:'error', summary:'Erro!', detail:'Ocorreu um erro inesperado, contate o administrador.'});
      }
    });
  }

  sendVote(vote: string){

    if(this.votingOptions.find(option => option == vote) == undefined){
      
      this.messageService.add({key: 'bc', severity:'error', summary:'Erro!', detail:'Opcao de voto invalida!'});
    }else{

      let parlamentarVotingId = this.findParlamentarVotingId(this.parlamentar.id);
      if(parlamentarVotingId != null){
        let voteDTO = new VoteDTO(parlamentarVotingId, this.parlamentar.id, vote);
        
        this.sessionService.computeVote(this.session.uuid, voteDTO).subscribe({
          next: data => {
            this.messageService.add({key: 'bc', severity:'success', summary:'Sucesso!', detail:'Seu voto foi contabilizado com exito!'});
          },error: err => {
            this.messageService.add({key: 'bc', severity:'error', summary:'Erro!', detail:'Ocorreu um erro inesperado, contate o administrador.'});
          }
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

  fullScreen() {
    this.utilService.fullScreen();
  }

}
