import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Role } from '../domain/role.model';
import { TownHall } from '../domain/townhall.model';
import { User } from '../domain/user.model';
import { UpdateUserRoleDTO } from '../dto/update-user-role-dto.model';
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

  checked: boolean = false;

  userList: User[];

  showTable: boolean = false;
  isEditting: boolean = false;
  showDialog: boolean = false;
  submitted: boolean = false;
  isTownHallMayor: boolean = false;
  moderatorTypeFlag: boolean = true;

  showDialogUpdatePassword: boolean = false;
  
  titleModal: string = '';
  labelBtConfirmModal: string = '';
  formUser: FormGroup; 

  townhalls: TownHall[];
  selectedTownhall: TownHall = null;
  roles: Role[];
  selectedRole: string = "ROLE_MODERATOR";
  
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
      townHallId: new FormControl('')
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

  onClickUserType(value: string){
    this.moderatorTypeFlag = value == "MODERATOR";
  }

  openModal(user: User, isEditing: boolean){
    
    this.showDialog = true;
    this.isEditting = isEditing;
    this.labelBtConfirmModal = isEditing ? 'Atualizar' : 'Adicionar';
    this.titleModal = isEditing ? 'Atualizar utilizador' : 'Adicionar utilizador';

    if(user != null){
      let userAdapter = user;
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
      console.log(res);
      this.userList = res;
      this.showTable = true;
    });

  }

  clearInputs(){
    
    this.submitted = false;
    this.formUser.reset();
    this.selectedTownhall = null;
    this.moderatorTypeFlag = true;
    this.selectedRole = "ROLE_MODERATOR";
  }

  selectRole(){

    return this.roles.find(role => role.name == this.selectedRole);
  }

  onSubmit(){

    this.submitted = true;

    if (this.formUser.invalid) {
      return;
    }

    try {
      
      let formValue = this.formUser.value;
      let role = this.selectRole();
      console.log(role, this.roles);
      this.selectedTownhall = this.townhalls.find(t => t.id == formValue.townHallId);
      let userDTO = new UserDTO(formValue.name, formValue.username, formValue.password, this.selectedTownhall, role);
      
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
      console.log(error);
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