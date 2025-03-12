import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { LoginDTO } from '../dto/login-dto.model';
import { UserLoggedDTO } from '../dto/user-logged-dto.model';
import { LoginService } from '../service/login.service';
import { UtilService } from '../service/util.service';
import { TownHall } from '../domain/townhall.model';
import { Parlamentar } from '../domain/parlamentar.model';
import { TownHallService } from '../service/townhall.service';
import { ParlamentarService } from '../service/parlamentar.service';
import { User } from '../domain/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  townhalls: TownHall[] = [];
  parlamentares: Parlamentar[] = [];
  operadores: User[] = [];
  selectedParlamentarImage: string = '';
  accountTypes = [
    { label: 'Gestão', value: 'GESTAO' },
    { label: 'Vereador(a)', value: 'VEREADOR' }
  ];
  password: string = '';
  maskedPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private townHallService: TownHallService,
    private parlamentarService: ParlamentarService,
    private loginService: LoginService,
    private messageService: MessageService,
    private cookieService: CookieService,
    private router: Router,
    private userService: UserService
  ) {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      accountType: ['VEREADOR', Validators.required],
      townHallId: ['', Validators.required],
      parlamentarId: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm.get('accountType').valueChanges.subscribe(value => {
      const townHallControl = this.loginForm.get('townHallId');
      if (value === 'VEREADOR') {
        townHallControl.setValidators(Validators.required);
      } else {
        townHallControl.clearValidators();
      }
      townHallControl.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.loadTownHalls();
  }

  loadTownHalls() {
    this.townHallService.getTownHallList().subscribe({
      next: (res) => {
        this.townhalls = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Erro ao carregar câmaras municipais'
        });
      }
    });
  }

  get filteredTownhalls() {
    return this.townhalls.filter(townhall => townhall.name !== 'Admin');
  }

  loadOperadores() {
    this.userService.findAll().subscribe({
      next: (data) => {
        this.operadores = data.filter(user => 
          user.roles.some(role => 
            role.name === 'ROLE_ADMIN' || 
            role.name === 'ROLE_MODERATOR'
          )
        );
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Erro ao carregar lista de operadores'
        });
      }
    });
  }

  onTownHallChange() {
    const townHallId = this.loginForm.get('townHallId').value;
    if (townHallId && this.loginForm.get('accountType').value === 'VEREADOR') {
      this.loadParlamentares(townHallId);
      this.selectedParlamentarImage = '';
    }
  }

  loadParlamentares(townHallId: number) {
    this.parlamentarService.getParlamentarList(townHallId).subscribe({
      next: (data) => {
        this.parlamentares = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Erro ao carregar lista de vereadores'
        });
      }
    });
  }
  
  onParlamentarChange() {
    const parlamentarId = this.loginForm.get('parlamentarId').value;
    if (parlamentarId) {
      const parlamentar = this.parlamentares.find(p => p.id === parlamentarId);
      this.selectedParlamentarImage = parlamentar?.urlImage || '';
    } else {
      this.selectedParlamentarImage = '';
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const formValue = this.loginForm.value;
      
      let username = '';
      if (formValue.accountType === 'VEREADOR') {
        const parlamentar = this.parlamentares.find(p => p.id === formValue.parlamentarId);
        username = parlamentar?.username || '';
      } else {
        const operador = this.operadores.find(o => o.id === formValue.parlamentarId);
        username = operador?.username || '';
      }

      const loginDTO = new LoginDTO(username, formValue.password);

      this.loginService.signIn(loginDTO).subscribe({
        next: (response) => {
          this.cookieService.set('user-role', response.roles[0].name);
          this.cookieService.set('user-name', response.name);
          this.cookieService.set('user-username', username);
          
          // Só salva o townHallId se for vereador
          if (formValue.accountType === 'VEREADOR') {
            this.cookieService.set('user-townhall-id', formValue.townHallId.toString());
          }

          switch(response.roles[0].name) {
            case 'ROLE_ADMIN': this.router.navigate(['admin']); break;
            case 'ROLE_MODERATOR': this.router.navigate(['gestao']); break;
            case 'ROLE_USER':
            case 'ROLE_MODERATOR_VIEW': 
              this.router.navigate(['home']); break;
          }
        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: error.error?.description || 'Erro ao realizar login'
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  onAccountTypeChange(value: string) {
    this.loginForm.get('accountType').setValue(value);
    
    this.parlamentares = [];
    this.operadores = [];
    this.selectedParlamentarImage = '';
    
    if (value === 'GESTAO') {
      this.loadOperadores();
    }
  }

  onNumberClick(number: string) {
    if (this.password.length < 8) {
      this.password += number;
      this.maskedPassword = '*'.repeat(this.password.length);
      this.loginForm.patchValue({
        password: this.password
      });
    }
  }

  clearPassword() {
    this.password = '';
    this.maskedPassword = '';
    this.loginForm.patchValue({
      password: ''
    });
  }

  deleteLastDigit() {
    if (this.password.length > 0) {
      this.password = this.password.slice(0, -1);
      this.maskedPassword = '*'.repeat(this.password.length);
      this.loginForm.patchValue({
        password: this.password
      });
    }
  }
}
