import { Parlamentar } from "./parlamentar.model";
import { TownHall } from "./townhall.model";

export class UtilShowTimer{

    private parlamentar : Parlamentar;
    private parlamentarAParte: Parlamentar;
    private townHall: TownHall;
    private time: number;
    private timeDescription: string;

    constructor(){
        this.parlamentarAParte = null;
    }

    setParlamentar(parlamentar: Parlamentar){
        if(parlamentar != null && parlamentar != undefined){
            this.parlamentar = parlamentar;
        }
    }

    getParlamentar(){ return this.parlamentar; }

    setTime(time: number){
        if(time != null && time != undefined && time != 0){
            this.time = time;
        }
    }

    getTime(){ return this.time; }

    setTimeDescription(timeDescription: string){
        if(timeDescription != null && timeDescription != undefined && timeDescription.length > 0){
            this.timeDescription = timeDescription;
        }
    }

    getTimeDescription(){ return this.timeDescription; }

    setParlamentarAParte(parlamentar: Parlamentar){
        this.parlamentarAParte = parlamentar;
    }

    getParlamentarAParte(){ return this.parlamentarAParte; }

    setTownHall(townHall: TownHall){
        if(townHall != null && townHall != undefined){
            this.townHall = townHall;
        }
    }

    getTownHall(){return this.townHall; }
}