export class VoteDTO{
    
    parlamentarVotingId: number;
    parlamentarId: number;
    option:string;

    constructor(parlamentarVotingId: number, parlamentarId: number, option: string){
        
        this.parlamentarVotingId = parlamentarVotingId;
        this.parlamentarId = parlamentarId;
        this.option = option;
    }
}