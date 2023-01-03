import { Role } from "./role.model";
import { TownHall } from "./townhall.model";

export class User{

    public id: number;
    public name: string;
    public username: string;
    public password: string;
    public isRecoveringPassword: boolean;
    public roles: Role[];
    public townhall: TownHall;
    public townhallName: string;

    constructor(){}
}