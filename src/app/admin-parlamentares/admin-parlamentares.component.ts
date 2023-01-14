import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Parlamentar } from '../domain/parlamentar.model';
import { TownHall } from '../domain/townhall.model';
import { UpdateUserRoleDTO } from '../dto/update-user-role-dto.model';
import { FormResetPasswordComponent } from '../form-reset-password/form-reset-password.component';
import { ParlamentarService } from '../service/parlamentar.service';
import { TownHallService } from '../service/townhall.service';
import { UserService } from '../service/user.service';

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
    private messageService: MessageService, public dialogService: DialogService, private userService : UserService) { }

  ngOnInit(): void {

    this.townHallService.getTownHallList().subscribe(res => {
      this.townhalls = res;
    });
  }

  onTownHallChange(){
    
    this.showTable = false;
    this.parlamentarList = [];
    this.searchParlamentar();
  }

  searchParlamentar(){
    this.parlamentarService.getParlamentarList(this.selectedTownhall.id).subscribe(data => {
      this.parlamentarList = data;
      console.log(this.parlamentarList);
      this.showTable = true;
    });
  }

  updateUserRole(userId: number){

    let updateUserRoleDTO = new UpdateUserRoleDTO(userId, this.selectedTownhall.id);

    this.parlamentarService.updateRole(updateUserRoleDTO).subscribe({
      next: data => {
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Usuário agora é o presidente da câmara!'});
        this.searchParlamentar();
      },error: err => {
        this.messageService.add({severity:'error', summary:'Erro!', detail:'Ocorreu um erro inesperado, contate o administrador.'});
      }
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
