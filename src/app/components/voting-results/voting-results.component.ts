import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from '../../service/session.service';
import { VotingHistoryDTO } from '../../dto/voting-history-dto.model';

@Component({
  selector: 'app-voting-results',
  templateUrl: './voting-results.component.html',
  styleUrls: ['./voting-results.component.css']
})
export class VotingResultsComponent implements OnInit {
  votingHistoryList: VotingHistoryDTO[] = [];
  townHallId: number = 0;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.townHallId = Number.parseInt(
      this.cookieService.get('user-townhall-id')
    );

    this.loadVotingHistory(this.townHallId);
  }

  loadVotingHistory(townHallId: number) {
    this.loading = true;
    this.sessionService.findSessionTodayByTownhall(townHallId).subscribe({
      next: (session) => {
        if (session == null) {
          this.loading = false;
          this.errorMessage = 'Não há sessão em andamento hoje.';
          return;
        }

        this.sessionService.findVotingHistory(session.uuid).subscribe({
          next: (votingHistoryList) => {
            this.votingHistoryList = votingHistoryList;
            this.loading = false;
          },
          error: (error) => {
            console.error('Erro ao buscar histórico de votações:', error);
            this.errorMessage = 'Ocorreu um erro ao buscar o histórico de votações.';
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Erro ao buscar sessão:', error);
        this.errorMessage = 'Ocorreu um erro ao buscar a sessão.';
        this.loading = false;
      }
    });
  }

  getResultLabel(result: string): string {
    if (!result) {
      return '';
    }
    if (result.toUpperCase().startsWith('APROVADA')) {
      return 'Aprovada';
    }
    if (result.toUpperCase().startsWith('REJEITADA')) {
      return 'Rejeitada';
    }
    return result;
  }

  getResultClass(result: string): string {
    if (!result) {
      return '';
    }
    if (result.toUpperCase().startsWith('APROVADA')) {
      return 'result-approved';
    }
    if (result.toUpperCase().startsWith('REJEITADA')) {
      return 'result-rejected';
    }
    return '';
  }

  goBack() {
    this.router.navigate(['home']);
  }
}
