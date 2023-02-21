import { Parlamentar } from "./parlamentar.model";

export class TableRole{

    id: number = 0;
    townhallId: number = 0;
    name: string = '';
    position: number = 0;
    parlamentar: Parlamentar = new Parlamentar();

    constructor(){
    }
}