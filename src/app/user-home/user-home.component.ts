import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';
import { SessionParlamentarDTO } from '../dto/session-parlamentar-dto.model';
import { ParlamentarPresenceDTO } from '../dto/parlamentar-presence-dto.model';
import { SpeakerSubscriptionDTO } from '../dto/subscription-speaker.model';
import { VoteDTO } from '../dto/vote-dto.model';
import { MessageService } from 'primeng/api';
import { UtilService } from '../service/util.service';
import { Voting } from '../domain/voting.model';
import { Router } from '@angular/router';
import { ParlamentarShortDTO } from '../dto/parlamentar-short-dto.model';
import { TownHallService } from '../service/townhall.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  username: string = '';
  parlamentar: ParlamentarShortDTO = new ParlamentarShortDTO();
  townHallCityName: string = "";
  townHallUrlImage: string = '';
  linkSessao: string = "";
  session: SessionParlamentarDTO;
  existsSession: boolean = false;
  existsOpenVoting: boolean = false;
  townHallId : number = 0;
  votingOptions: string[] = [];
  voting: Voting;

  showInscriptionListDialog : boolean = false;

  votingTitle:string = '';
  parlamentarUserType = 'P'

  constructor(private userService: UserService, private messageService: MessageService,
  private sessionService: SessionService, private cookieService: CookieService, public townHallService: TownHallService, private router: Router, private utilService: UtilService) { }


  ngOnInit(): void {

    this.votingOptions.push('YES');
    this.votingOptions.push('NO');
    this.votingOptions.push('ABSTENTION');

    this.townHallId = Number.parseInt(this.cookieService.get('user-townhall-id'));
    this.townHallService.getById(this.townHallId).subscribe({      
        
      next: townHall => {

          this.townHallCityName = townHall.name;
          this.townHallUrlImage = townHall.urlImage;
          this.cookieService.set('townHallCityName', this.townHallCityName);
          this.cookieService.set('townHallUrlImage', this.townHallUrlImage);
        },
        error: error => {
          this.messageService.add({severity:'error', summary:'Erro!', detail:'Aconteceu algum erro inesperado!'});
        }
    });

    this.username = this.cookieService.get('user-username');
    this.userService.findByUsername(this.username).subscribe(res => {
      this.parlamentar = res;
    });


    setInterval(() => {
      this.findSessionTodayByTownhall(this.townHallId);
    }, 3000);

  }

  logOut(){
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

  showDialog(){
    this.showInscriptionListDialog = true;
  }

  findSessionTodayByTownhall(townHallId: number){

    this.sessionService.findSessionTodayByTownhall(townHallId).subscribe(res => {
      if(res != null){

        this.session = res;
        this.voting = this.session.voting;
        this.linkSessao = this.session.sessionSubjectURL;
        this.existsOpenVoting = this.session.voting != null && this.session.voting.status == 'VOTING';
        this.updatePresence();
        if(this.existsOpenVoting){
          this.votingTitle = this.session.voting.description;
        }else{
          this.votingTitle = "";
        }
      }
    }, error => {
      console.log(error);
    });
  }

  updatePresence(){

    let parlamentarPresenceDTO = new ParlamentarPresenceDTO(this.parlamentar.id, 'PRESENCE');
    this.sessionService.updateParlamentarPresence(this.session.uuid, parlamentarPresenceDTO).subscribe(() =>{

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

  signOut(){
    this.cookieService.deleteAll();
    this.router.navigate(['home']);
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

  getDisableColor(){
    return this.existsOpenVoting ? '' : 'gray';
  }

  clear(){
    this.showInscriptionListDialog = false;
  }

}
