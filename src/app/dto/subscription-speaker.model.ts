export class SpeakerSubscriptionDTO{
    townhallId: number;
    parlamentarId: number;
    type: string;

    constructor(townhallId: number, parlamentarId: number, type: string){
        this.townhallId = townhallId;
        this.parlamentarId = parlamentarId;
        this.type = type;
    }
}