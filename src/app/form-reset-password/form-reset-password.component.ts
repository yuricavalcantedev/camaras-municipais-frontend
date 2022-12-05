import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDTOUpdatePassword } from '../dto/user-dto-update-password.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.css']
})
export class FormResetPasswordComponent implements OnInit {

  formUpdatePassword: FormGroup;
  submitted: boolean = false;
  userDTO: any;

  constructor(private userService: UserService,  public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,  private messageService: MessageService) { }

  ngOnInit(): void {

    this.userDTO = this.config.data;

    this.formUpdatePassword = new FormGroup({
      username: new FormControl({value: this.userDTO.username, disabled: true}),
      password: new FormControl('', [Validators.required]),
      repPassword: new FormControl('', [Validators.required])
    });
    
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formUpdatePassword.controls;
  }

  onSubmit(){

    this.submitted = true;

    if (this.formUpdatePassword.invalid) {
      return;
    }

    try {
      
      let formValue = this.formUpdatePassword.value;
      let userDTOUpdatePWD = new UserDTOUpdatePassword(this.userDTO.id, this.userDTO.username, formValue.password, formValue.repPassword);
      
      this.userService.updatePassword(userDTOUpdatePWD).subscribe({

            next: data => {
              this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Senha alterada com sucesso!'});
            },
      
            error: error => {
              this.messageService.add({severity:'error', summary:'Erro!', detail:'Ocorreu um erro inesperado, contate o administrador.'});
            }
          });

      this.onCancel();
      this.ref.close();

    } catch (error) {

    }
  }

  onCancel(){

    this.submitted = false;
    this.formUpdatePassword.reset();
  }

}
