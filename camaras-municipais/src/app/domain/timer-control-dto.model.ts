import { Parlamentar } from "./parlamentar.model";
import { TownHall } from "./townhall.model";

export class TimerControlDTO{
    
  private parlamentar: Parlamentar;
  private townHall: TownHall;
  private timer: number = 10;

  constructor() { }

  public getParlamentar(){ return this.parlamentar; }

  public getTownHall(){ return this.townHall; }

  public getTimer(){ return this.timer; }

  public setParlamentar(parlamentar : Parlamentar){
    this.parlamentar = parlamentar;
  }

  public setTownHall(townHall : TownHall){
    this.townHall = townHall;
  }

  public setTimer(timer: number){
    this.timer = timer;
  }
}