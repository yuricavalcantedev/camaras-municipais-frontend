import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Timer } from '../../interfaces/timers';

@Component({
  selector: 'app-timer-control',
  templateUrl: './timer-control.component.html',
  styleUrls: ['./timer-control.component.css']
})
export class TimerControlComponent implements OnInit {

  timeLabel: string = '00:00';
  @Input() flagTransmitir: boolean;
  @Input() timer: Timer;
  @Output() openModalWithTime = new EventEmitter<number>();
  
  constructor(){
  }

  ngOnInit(): void {
    this.flagTransmitir = true;
  }

  ngOnChanges(changes: SimpleChanges) {

    
    let timer = changes['timer'];
    let flagTransmitirChanges = changes['flagTransmitir'];
    
    if(timer != undefined && timer.currentValue != undefined){
      this.timeLabel = timer.currentValue.label;
    }

    if(flagTransmitirChanges != undefined && flagTransmitirChanges.currentValue != undefined){
      this.flagTransmitir = flagTransmitirChanges.currentValue;
    }
    
  }


  onTransmitir(){
    
    this.openModalWithTime.emit(0);
  }

  onFinalizarTempo(){
    this.openModalWithTime.emit(-1);
  }
}
