import { Role } from "../domain/role.model";

export class ParlamentarShortDTO{
    
    id: number;
    name : string;
    politicalParty : string;
    urlImage : string;
    role : Role = new Role('');

    constructor(){}
}