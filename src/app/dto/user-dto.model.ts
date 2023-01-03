import { Role } from "../domain/role.model";
import { TownHall } from "../domain/townhall.model";

export class UserDTO{

    name: string;
    username: string;
    password: string;
    townHall: TownHall;
    roles: Role[] = [];

    constructor(name: string, username: string, password: string, townHall: TownHall, role: Role){

        this.name = name;
        this.username = username;
        this.password = password;
        this.townHall = townHall;
        this.roles.push(role);

    }
}