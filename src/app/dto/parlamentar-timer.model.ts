import { Parlamentar } from "../domain/parlamentar.model";

export class ParlamentarTimer{
    
    id: number = null;
    name: string;
    politicalParty: string;
    urlImage: string;
    timeToSpeak: number;

    constructor(){}

    buildFromParlamentar(parlamentar: Parlamentar){
        this.id = parlamentar.id;
        this.name = parlamentar.name;
        this.politicalParty = parlamentar.politicalParty;
        this.urlImage = parlamentar.urlImage;
    }
}