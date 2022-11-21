import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {


  private audio: HTMLAudioElement;
  constructor() { }

  playSound(){

    this.audio = new Audio();
    this.audio.src = "assets/sounds/notification_sound.mp3";
    this.audio.load();
    this.audio.play();
  }

}
