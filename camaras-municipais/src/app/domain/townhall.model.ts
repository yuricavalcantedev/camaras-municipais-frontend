export class TownHall{
    
    id : number = 0;
    name: string = "";
    address: string = "";
    
    constructor(id: number, name:string, address:string){
        this.id = id;
        this.name = name;
        this.address = address;
    }
}