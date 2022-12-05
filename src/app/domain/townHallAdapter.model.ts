import { TownHall } from "./townhall.model";

export class TownHallFormAdapter{
    
    id : number = 0;
    name: string = "";
    urlImage: string = "";
    city: string = "";
    legislature: string = "";
    apiURL: string = "";
    
    constructor(townHall : TownHall){
        
        this.id = townHall.id;
        this.name = townHall.name;
        this.urlImage = townHall.urlImage;
        this.city = townHall.city;
        this.legislature = townHall.legislature;
        this.apiURL = townHall.apiURL;
    }
}