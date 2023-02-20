import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {


  private audio: HTMLAudioElement;
  constructor() { }

  playSound(path: string){
    if(!this.audio) {
      this.audio = new Audio();
    }
    this.audio.src = path;
    this.audio.load();
    this.audio.play();
  }
}
