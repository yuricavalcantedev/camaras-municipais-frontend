import { Component, OnInit } from '@angular/core';
import { ParlamentarService } from './service/parlamentar.service';
import { TownHallService } from './service/townhall.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'camaras-municipais';
  
  constructor(public parlamentarService: ParlamentarService, public townHallService: TownHallService) {}

  ngOnInit(): void {

    let townhallList = this.townHallService.getTownHallList().subscribe((res) => {
      console.log(res);
    })

    let list = this.parlamentarService.getParlamentarList(3).subscribe((res) => {
      console.log(res);
    });
  }


}
