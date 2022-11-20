import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TownHall } from '../domain/townhall.model';
import { TownHallService } from '../service/townhall.service';

interface IUser {
  name: string;
  nickname: string;
  email: string;
  password: string;
  showPassword: boolean;
}

@Component({
  selector: 'app-admin-town-hall',
  templateUrl: './admin-town-hall.component.html',
  styleUrls: ['./admin-town-hall.component.css']
})
export class AdminTownHallComponent implements OnInit {


  townHallList: TownHall[];
  townHallModel: TownHall = new TownHall();
  showDialog: boolean = false;
  formTownHall: FormGroup;
  submitted: boolean = false;

  constructor(public townHallService: TownHallService, private formBuilder: FormBuilder) { 
    
    this.formTownHall = new FormGroup({
      name: new FormControl('', [Validators.required]),
      urlImage: new FormControl(''),
      city: new FormControl(''),
      legislature: new FormControl(''),
      apiURL: new FormControl('')
    });
  }

  ngOnInit(): void {

    this.townHallService.getTownHallList().subscribe((res) => {
      this.townHallList = res;
    });

    this.formTownHall = new FormGroup({
      name: new FormControl(this.townHallModel.name, [Validators.required]),
      urlImage: new FormControl(this.townHallModel.urlImage),
      city: new FormControl(this.townHallModel.city),
      legislature: new FormControl(this.townHallModel.legislature),
      apiURL: new FormControl(this.townHallModel.apiUrl, [Validators.required]),
    });

  }

  get form(): { [key: string]: AbstractControl } {
    return this.formTownHall.controls;
  }

  openModal(townHall: TownHall, isEditing: boolean){
    this.showDialog = true;
  }

  onSubmit(){

    this.submitted = true;

    if (this.formTownHall.invalid) {
      return;
    }

    console.log("OK");
  }

}
