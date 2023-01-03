export class ParlamentarPresenceDTO{
    
    parlamentarId: number;
    status: string;

    constructor(parlamentarId: number, status: string){
        this.parlamentarId = parlamentarId;
        this.status = status;
    }
}
    