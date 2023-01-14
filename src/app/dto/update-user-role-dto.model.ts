export class UpdateUserRoleDTO{
    
    parlamentarId : number;
    townHallId: number;

    constructor(parlamentarId: number, townHallId: number){
        
        this.parlamentarId = parlamentarId;
        this.townHallId = townHallId;
    }
}