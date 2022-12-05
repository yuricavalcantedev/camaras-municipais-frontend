import { TownHall } from "../domain/townhall.model";

export class UserDTO{

    name: string;
    username: string;
    password: string;
    townHall: TownHall;

    constructor(name: string, username: string, password: string, townHall: TownHall){
        
        this.name = name;
        this.username = username;
        this.password = password;
        this.townHall = townHall;
    }
}