import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Parlamentar } from '../domain/parlamentar.model';
import { TownHall } from '../domain/townhall.model';
import { FormResetPasswordComponent } from '../form-reset-password/form-reset-password.component';
import { ParlamentarService } from '../service/parlamentar.service';
import { TownHallService } from '../service/townhall.service';

@Component({
  selector: 'app-admin-parlamentares',
  templateUrl: './admin-parlamentares.component.html',
  styleUrls: ['./admin-parlamentares.component.css'],
  providers:[DialogService]
})

export class AdminParlamentaresComponent implements OnInit {

  townhalls: TownHall[];
  parlamentarList: Parlamentar[];
  selectedTownhall: TownHall = new TownHall();

  showTable: boolean = false;

  constructor(public parlamentarService: ParlamentarService, public townHallService: TownHallService,
    private messageService: MessageService, public dialogService: DialogService) { }

  ngOnInit(): void {

    this.townHallService.getTownHallList().subscribe(res => {
      this.townhalls = res;
    });
  }

  onTownHallChange(){
    
    this.showTable = false;
    this.parlamentarList = [];
    this.parlamentarService.getParlamentarList(this.selectedTownhall.id).subscribe(data => {
      this.parlamentarList = data;
      this.showTable = true;
    });
  }

  openModalUpdatePassword(id: number, username: string){
    
    const refModal = this.dialogService.open(FormResetPasswordComponent, {
      header: 'Atualizar senha',
      width: '50%',
      data:{
        id: id,
        username: username,
      }
    });

    refModal.onClose.subscribe(data => {      
    });
  }

}
