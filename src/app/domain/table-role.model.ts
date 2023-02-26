import { Parlamentar } from "./parlamentar.model";
import { TownHall } from "./townhall.model";

export class TableRole{

    id: number = 0;
    townHall: TownHall;
    name: string = '';
    position: number = 0;
    parlamentar: Parlamentar = new Parlamentar();

    constructor(){
    }
}