import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent {

  title = 'clock-greets';
  time: any;
  hours: any;
  constructor(private date: DatePipe){
    registerLocaleData(localeBr, 'pt')
    setInterval(() => {
      this.time = new Date();
   }, 1000);
  }
}
