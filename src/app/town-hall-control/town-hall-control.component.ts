import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Parlamentar } from '../domain/parlamentar.model';
import { TownHall } from '../domain/townhall.model';
import { ParlamentarService } from '../service/parlamentar.service';
import { TownHallService } from '../service/townhall.service';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-town-hall-control',
  templateUrl: './town-hall-control.component.html',
  styleUrls: ['./town-hall-control.component.css']
})
export class TownHallControlComponent implements OnInit {

  showParlamentarImage: boolean = false;
  townhalls: TownHall[];
  parlamentarList: Parlamentar[];

  selectedTownhall: TownHall = new TownHall();
  selectedParlamentar: Parlamentar = new Parlamentar();

  selectedParlamentarList: Parlamentar[];

  
  loading: boolean = false;
  disableParlamentarDropdown = true;

  @Output() updateParlamentar = new EventEmitter<Parlamentar>();
  @Output() updateFlagTransmitir = new EventEmitter<boolean>();

  constructor(public parlamentarService: ParlamentarService, public townHallService: TownHallService, private utilService: UtilService) {
  
  }

  ngOnInit(): void {

    //the buttons will start disabled
    this.updateFlagTransmitir.emit(true);
    this.townHallService.getTownHallList().subscribe(res => {
      this.townhalls = res;
    });

    this.loading = true;
    
  }

  selectRow(){
    
    if(this.selectedParlamentarList.length == 1){

      this.selectedParlamentar = this.selectedParlamentarList[0];
      this.utilService.getUtilShowTimer().setParlamentar(this.selectedParlamentar);
      this.updateFlagTransmitir.emit(false);

    }else{
      this.updateFlagTransmitir.emit(true);
    }
  }
  
  onTownHallChange(){
    
    this.showParlamentarImage = false;
    this.parlamentarList = [];
    this.selectedParlamentar = new Parlamentar();
    this.disableParlamentarDropdown = false;

    this.parlamentarService.getParlamentarList(this.selectedTownhall.id).subscribe(data => {
      this.parlamentarList = data;
      console.log(this.parlamentarList);
    });

    this.utilService.getUtilShowTimer().setTownHall(this.selectedTownhall);
  }

  callAParte(parlamentar: Parlamentar){

    this.utilService.getUtilShowTimer().setParlamentarAParte(parlamentar);
    this.utilService.changeTransmitirData(true);
    
  }

}
