import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { TownHall } from 'src/app/domain/townhall.model';
import { TownHallService } from 'src/app/service/townhall.service';

@Component({
  selector: 'app-townhall-settings',
  templateUrl: './townhall-settings.component.html',
  styleUrls: ['./townhall-settings.component.css']
})
export class TownhallSettingsComponent implements OnInit {

  eVotingTypeResultList = ['MAIORIA_SIMPLES', 'MAIORIA_QUALIFICADA', 'MAIORIA_ABSOLUTA'];
  eVotingVisibilityTypeList = ['SIMBOLICA', 'NOMINAL', 'SECRETA'];
  townhall : TownHall = new TownHall();
  townhallId: any;
  loading: boolean = false;

 
  constructor(private _activatedroute: ActivatedRoute, private _townHallService: TownHallService, private cookieService: CookieService, 
    private _messageService: MessageService, private router: Router){
    
    if(this.cookieService.get('user-role') != 'ROLE_ADMIN'){
      this.cookieService.deleteAll();
      this.router.navigate(['']);
    }

    this.townhallId = _activatedroute.snapshot.paramMap.get("id");
    this._townHallService.getById(this.townhallId).subscribe({
        
      next: data => {
        this.townhall = data;
      },
      error: error => {
        this._messageService.add({severity:'error', summary:'Erro!', detail:'Aconteceu algum erro inesperado!'});
      }
    });
  }

  ngOnInit(): void {
  }

  updateTownHall(){
  
    this.loading = true;
    this._townHallService.updateTownHall(this.townhall).subscribe({
        next: data => {
          this._messageService.add({severity:'success', summary:'Sucesso!', detail:'Câmara atualizada com sucesso!'});
          this.loading = false;
        },
        error: error => {
          console.log(error);
          this._messageService.add({severity:'error', summary:'Ocorreu um erro', detail: error.error.message});
          this.loading = false;
        }
    });
  }

}
