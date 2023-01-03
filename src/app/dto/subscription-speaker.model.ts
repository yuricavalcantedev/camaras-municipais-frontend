export class SpeakerSubscriptionDTO{
    townhallId: number;
    parlamentarId: number;

    constructor(townhallId: number, parlamentarId: number){
        this.townhallId = townhallId;
        this.parlamentarId = parlamentarId;
    }
}