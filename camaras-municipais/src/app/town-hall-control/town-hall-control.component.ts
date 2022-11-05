import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  showParlamentarImage: boolean = false;
  townhalls: TownHall[];
  parlamentarList: Parlamentar[];
  timerFunctionList: TimerFunction[] = [];

  selectedTownhall: TownHall = new TownHall();
  selectedParlamentar: Parlamentar = new Parlamentar();
  selectedTimerFunction: TimerFunction;
  
  disableParlamentarDropdown = true;

  @Output() updateParlamentar = new EventEmitter<Parlamentar>();

  constructor(public parlamentarService: ParlamentarService, public townHallService: TownHallService) {
    this.timerFunctionList.push(new TimerFunction('Pequeno Expediente', 5 * 60), new TimerFunction('Grande Expediente', 10 * 60));
  }

  ngOnInit(): void {

    this.townHallService.getTownHallList().subscribe((res) => {
      this.townhalls = res;
    });
    
  }

  onTownHallChange(){
    
    this.showParlamentarImage = false;
    this.parlamentarList = [];
    this.selectedParlamentar = new Parlamentar();
    this.parlamentarService.getParlamentarList(this.selectedTownhall.id).subscribe((res) => {
      this.disableParlamentarDropdown = false;
      this.parlamentarList = res;
    });
  }

  onParlamentarChange(){

    this.showParlamentarImage = true;
    this.updateParlamentar.emit(this.selectedParlamentar);
  }

}
