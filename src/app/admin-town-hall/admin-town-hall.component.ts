import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { TownHall } from '../domain/townhall.model';
import { TownHallFormAdapter } from '../domain/townHallAdapter.model';
import { TownHallService } from '../service/townhall.service';

@Component({
  selector: 'app-admin-town-hall',
  templateUrl: './admin-town-hall.component.html',
  styleUrls: ['./admin-town-hall.component.css']
})
export class AdminTownHallComponent implements OnInit {


  townHallList: TownHall[];
  formTownHall: FormGroup;  
  titleModal: string = 'Adicionar Câmara';
  labelBtConfirmModal: string = '';
  
  showTable:boolean = false;
  submitted: boolean = false;
  isEditting: boolean = false;
  showDialog: boolean = false;
  disableLegislatureField: boolean = true;

  showLegislatureDialog: boolean = false;
  eVotingTypeResultList = ['MAIORIA_SIMPLES', 'MAIORIA_QUALIFICADA', 'MAIORIA_ABSOLUTA'];
  eVotingVisibilityTypeList = ['SIMBOLICA', 'NOMINAL', 'SECRETA'];
  

  townHallSelectedLegislatureUpdate: TownHall = new TownHall();

  constructor(public townHallService: TownHallService, private cookieService: CookieService, private messageService: MessageService, private router: Router) { 
  }

  ngOnInit(): void {

    this.formTownHall = new FormGroup({

      id:new FormControl(''),
      name: new FormControl('', [Validators.required]),
      urlImage: new FormControl(''),
      city: new FormControl(''),
      legislature: new FormControl(''),
      apiURL: new FormControl('', [Validators.required],),
    });
    
    this.formTownHall.controls['legislature'].disable();
    
    if(this.cookieService.get('user-role') != 'ROLE_ADMIN'){
      this.cookieService.deleteAll();
      this.router.navigate(['']);
    }

    if(this.cookieService.get('user-username') == ''){
      this.cookieService.deleteAll();
      this.router.navigate(['']);
    }

    this.getTownHallList();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formTownHall.controls;
  }

  onUpdateLegislatureModal(townhall: any){
    this.townHallSelectedLegislatureUpdate = townhall;
    this.showLegislatureDialog = true;
    console.log(this.townHallSelectedLegislatureUpdate);

  }

  openModal(townHall: TownHall, isEditing: boolean){
    
    this.showDialog = true;
    this.isEditting = isEditing;
    this.labelBtConfirmModal = isEditing ? 'Atualizar' : 'Adicionar';

    if(townHall != null){
      let townHallAdapter = new TownHallFormAdapter(townHall);
      this.formTownHall.setValue(townHallAdapter);
    }

  }

  acessTownHall(townHallId: number){
    this.cookieService.set('user-townhall-id', townHallId + '');
    this.router.navigate(['gestao']);
  }

  onSubmit(){

    this.submitted = true;

    if (this.formTownHall.invalid) {
      return;
    }

    try {
      
      let townHall = this.formTownHall.value;
      this.isEditting ? this.townHallService.updateTownHall(townHall) : this.townHallService.createTownHall(townHall);
      this.showDialog = false;
      this.clearInputs();
      this.getTownHallList();

    } catch (error) {

    }
  }

  onDelete(id: number){
    this.townHallService.delete(id);
    this.getTownHallList();
  }

  onCancelar(){

    this.showDialog = false;
    this.clearInputs();
  }

  getTownHallList(){

    this.showTable = false;
    this.townHallService.getTownHallList().subscribe(res => {
      console.log(res);
      this.townHallList = res;
      this.showTable = true;
    });
  }

  clearInputs(){
    this.formTownHall.reset();
    this.submitted = false;
  }

  updateTownHall(townHall: TownHall){

    console.log(townHall);
    this.townHallService.updateTownHall(townHall).subscribe({
        next: data => {          
          this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Câmara atualizada com sucesso!'});
          this.showLegislatureDialog = false;
          this.showDialog = false;
          this.clearInputs();
        },
  
        error: error => {
          console.log(error);
          this.messageService.add({severity:'error', summary:'Ocorreu um erro', detail: error.error.message});
          this.showLegislatureDialog = false;
          this.showDialog = false;
          this.clearInputs();
          
        }
      });
  }

}
