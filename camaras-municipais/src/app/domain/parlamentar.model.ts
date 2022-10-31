export class Parlamentar{
    
    id : number = 0;
    name: string = "";
    urlImage: string = "";
    main: boolean = false;
    active: boolean = false;
    politicalParty: string = "";
    
    constructor(id: number, name:string, urlImage:string, main:boolean, active:boolean, politicalParty: string){
        this.id = id;
        this.name = name;
        this.urlImage = urlImage;
        this.main = main;
        this.active = active;
        this.politicalParty = politicalParty;
    }
}