import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from '../../service/session.service';
import { SessionParlamentarDTO } from '../../dto/session-parlamentar-dto.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.css']
})
export class SpeakerListComponent implements OnInit, OnDestroy {
  session: SessionParlamentarDTO;
  selectedSpeakerType: string = 'GRANDE_EXPEDIENTE';
  townHallId: number = 0;
  private sessionSubscription: Subscription;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.session = new SessionParlamentarDTO();
    this.townHallId = Number.parseInt(
      this.cookieService.get('user-townhall-id')
    );

    // Buscar dados iniciais
    this.findSessionTodayByTownhall(this.townHallId);

    // Atualizar a cada 3 segundos (mesmo intervalo do user-home)
    this.sessionSubscription = interval(3000).subscribe(() => {
      this.findSessionTodayByTownhall(this.townHallId);
    });
  }

  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  findSessionTodayByTownhall(townHallId: number) {
    this.sessionService.findSessionTodayByTownhall(townHallId).subscribe(
      (res) => {
        if (res != null) {
          this.session = res;
        }
      },
      (error) => {
        console.error('Erro ao buscar sessão:', error);
      }
    );
  }

  getFilteredSpeakerList() {
    if (!this.session?.speakerSessionList) return [];
    return this.session.speakerSessionList.filter(speaker => 
      speaker.type === this.selectedSpeakerType
    );
  }

  getSpeakerTypeLabel(): string {
    switch(this.selectedSpeakerType) {
      case 'GRANDE_EXPEDIENTE':
        return 'o Grande Expediente';
      case 'PEQUENO_EXPEDIENTE':
        return 'o Pequeno Expediente';
      case 'OUTRO':
        return 'as Explicações Pessoais';
      default:
        return '';
    }
  }

  goBack() {
    this.router.navigate(['home']);
  }
}

