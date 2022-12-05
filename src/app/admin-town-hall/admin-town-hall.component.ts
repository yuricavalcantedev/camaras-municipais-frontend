import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  constructor(public townHallService: TownHallService) { 
  }

  ngOnInit(): void {

    this.formTownHall = new FormGroup({

      id:new FormControl(''),
      name: new FormControl('', [Validators.required]),
      urlImage: new FormControl(''),
      city: new FormControl(''),
      legislature: new FormControl(''),
      apiURL: new FormControl('', [Validators.required]),
    });

    this.getTownHallList();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formTownHall.controls;
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
      this.townHallList = res;
      this.showTable = true;
    });
  }

  clearInputs(){
    this.formTownHall.reset();
    this.submitted = false;
  }

  

}
