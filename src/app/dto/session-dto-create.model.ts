export class SessionDTOCreate{

    private saplSessionId: number;
    public townHallId: number;

    constructor(saplSessionId: number, townHallId: number){
        this.saplSessionId = saplSessionId;
        this.townHallId = townHallId;
    }
}