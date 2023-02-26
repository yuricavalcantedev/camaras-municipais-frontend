import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { LoginDTO } from '../dto/login-dto.model';
import { UserLoggedDTO } from '../dto/user-logged-dto.model';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  existsOpenSession: boolean = false;
  loading: boolean = false;

  constructor(private loginService: LoginService, private messageService: MessageService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      username: new FormControl (['', Validators.required]),
      password: new FormControl (['', Validators.required])
    });

    this.loginForm.reset();
  }

  onSubmit(){
    
    if(this.loginForm.invalid){
      return;
    }

    let formValue = this.loginForm.value;
    let loginDTO = new LoginDTO(formValue.username, formValue.password);
    this.loading = true;

    this.loginService.signIn(loginDTO).subscribe({      
      next: (user : UserLoggedDTO) => {

        this.cookieService.set('user-role', user.roles[0].name);
        this.cookieService.set('user-name', user.name);
        this.cookieService.set('user-username', loginDTO.username);
        this.cookieService.set('user-townhall-id', user.townHall.id + '');

        this.loading = false;
        switch(user.roles[0].name){
          
          case 'ROLE_ADMIN': this.router.navigate(['admin']);
          break;
          case 'ROLE_MODERATOR': this.router.navigate(['gestao']);
          break;
          case 'ROLE_USER': this.router.navigate(['home']);
          break;
          case 'ROLE_MODERATOR_VIEW': this.router.navigate(['home']);
          break;
        }
      },
  
      error: error => {
        console.log(error);
        this.loading = false;
        if(error.status == 400){
          this.messageService.add({severity:'error', summary:'Erro!', detail: error.error.description});
        }
      }
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

}
