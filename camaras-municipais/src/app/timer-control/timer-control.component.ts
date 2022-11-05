import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer-control',
  templateUrl: './timer-control.component.html',
  styleUrls: ['./timer-control.component.css']
})
export class TimerControlComponent implements OnInit {

  timer: number = 0;
  @Output() updateTimer = new EventEmitter<number>();
  constructor(){}

  ngOnInit(): void {

  }

  onButtonClick(timer: number){
    this.timer = timer;
  }

  onTransmitir(){
    this.updateTimer.emit(this.timer);
  }
}
