import { Component, OnInit } from '@angular/core';
import { Parlamentar } from '../domain/parlamentar.model';
import { TimerFunction } from '../domain/timerFunction.model';
import { TownHall } from '../domain/townhall.model';
import { ParlamentarService } from '../service/parlamentar.service';
import { TownHallService } from '../service/townhall.service';

@Component({
  selector: 'app-town-hall-control',
  templateUrl: './town-hall-control.component.html',
  styleUrls: ['./town-hall-control.component.css']
})
export class TownHallControlComponent implements OnInit {

  townhalls: TownHall[];
  parlamentarList: Parlamentar[];
  timerFunctionList: TimerFunction[] = [];

  selectedTownhall: TownHall;
  selectedParlamentar: Parlamentar = new Parlamentar();
  selectedTimerFunction: TimerFunction;
  
  disableParlamentarDropdown = true;

  constructor(public parlamentarService: ParlamentarService, public townHallService: TownHallService) {
    this.timerFunctionList.push(new TimerFunction('Pequeno Expediente', 5 * 60), new TimerFunction('Grande Expediente', 10 * 60));
  }

  ngOnInit(): void {

    this.townHallService.getTownHallList().subscribe((res) => {
      this.townhalls = res;
    });
    
  }

  onTownHallChange(){

    this.parlamentarList = [];
    this.selectedParlamentar = new Parlamentar();
    this.parlamentarService.getParlamentarList(this.selectedTownhall.id).subscribe((res) => {
      console.log(res);
      this.disableParlamentarDropdown = false;
      this.parlamentarList = res;
    });
  }

}
