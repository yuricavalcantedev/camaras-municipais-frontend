import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Role } from '../domain/role.model';
import { TownHall } from '../domain/townhall.model';
import { User } from '../domain/user.model';
import { UserDTO } from '../dto/user-dto.model';
import { FormResetPasswordComponent } from '../form-reset-password/form-reset-password.component';
import { RoleService } from '../service/role.service';
import { TownHallService } from '../service/townhall.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  providers: [DialogService]
})
export class AdminUsersComponent implements OnInit {

  userList: User[];

  showTable: boolean = false;
  isEditting: boolean = false;
  showDialog: boolean = false;
  submitted: boolean = false;
  isTownHallMayor: boolean = false;

  showDialogUpdatePassword: boolean = false;
  
  titleModal: string = '';
  labelBtConfirmModal: string = '';
  formUser: FormGroup; 

  townhalls: TownHall[];
  selectedTownhall: TownHall = null;
  roles: Role[];

  formUpdatePassword: FormGroup;

  constructor(private userService: UserService, private townHallService: TownHallService,
    private messageService: MessageService, public dialogService: DialogService,
    public roleService: RoleService) { }

  ngOnInit(): void {

    this.formUser = new FormGroup({

      id:new FormControl(''),
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repPassword: new FormControl('', [Validators.required]),
      townHallId: new FormControl('', [Validators.required])
    });

    this.townHallService.getTownHallList().subscribe(res => {
      this.townhalls = res;
    });

    this.roleService.getAll().subscribe(data => {
      this.roles = data;
    });

    this.getUserList();

  }

  get form(): { [key: string]: AbstractControl } {
    return this.formUser.controls;
  }

  openModal(user: User, isEditing: boolean){
    
    this.showDialog = true;
    this.isEditting = isEditing;
    this.labelBtConfirmModal = isEditing ? 'Atualizar' : 'Adicionar';
    this.titleModal = isEditing ? 'Atualizar utilizador' : 'Adicionar utilizador';

    if(user != null){
      let userAdapter = user;
      console.log("User adapter -> ", userAdapter);
      this.formUser.setValue(userAdapter);
    }

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

  onCancelar(){

    this.showDialog = false;
    this.clearInputs();
  }

  getUserList(){

    this.showTable = false;
    this.userService.findAll().subscribe(res => {
      this.userList = res;
      this.showTable = true;
    });

  }

  clearInputs(){
    
    this.formUser.reset();
    this.submitted = false;
    this.selectedTownhall = null;
  }

  onSubmit(){

    this.submitted = true;

    if (this.formUser.invalid) {
      return;
    }

    try {
      
      let formValue = this.formUser.value;
      this.selectedTownhall = this.townhalls.find(t => t.id == formValue.townHallId);
      let userDTO = new UserDTO(formValue.name, formValue.username, formValue.password, this.selectedTownhall);
      
      if(this.isEditting){

      }else{

        this.userService.create(userDTO).subscribe({

            next: data => {
              this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Utilizador criado com sucesso!'});
              this.getUserList();
            },
      
            error: error => {
              this.messageService.add({severity:'error', summary:'Erro!', detail:'Ocorreu um erro inesperado, contate o administrador.'});
            }
          });
      }
      
      this.showDialog = false;
      this.clearInputs();
      

    } catch (error) {

    }
  }

  onDelete(id: number){
    this.userService.delete(id).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Utilizador deletado com sucesso!'});
        this.getUserList();
      },
      error: error => {
        this.messageService.add({severity:'error', summary:'Ocorreu um erro', detail:'Sistema'});
      }
    });
  }

}
