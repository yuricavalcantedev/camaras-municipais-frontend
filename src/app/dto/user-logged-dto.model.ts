import { Role } from "../domain/role.model";
import { TownHall } from "../domain/townhall.model";

export class UserLoggedDTO{

    private _id: number;
    private _name: string;
    private _roles: Role[];
    private _townHall: TownHall;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    
    public get roles(): Role[] {
        return this._roles;
    }
    public set roles(value: Role[]) {
        this._roles = value;
    }
    
    public get townHall(): TownHall {
        return this._townHall;
    }
    public set townHall(value: TownHall) {
        this._townHall = value;
    }
    
    constructor(){}
}