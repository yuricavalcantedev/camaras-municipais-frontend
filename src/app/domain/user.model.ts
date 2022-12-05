import { Role } from "./role.model";

export class User{

    private _id: number;
    private _name: string;
    private _username: string;
    private _password: string;
    private _isRecoveringPassword: boolean;
    private _roles: Role[];
    
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
    
    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }
    
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    
    public get isRecoveringPassword(): boolean {
        return this._isRecoveringPassword;
    }
    public set isRecoveringPassword(value: boolean) {
        this._isRecoveringPassword = value;
    }
    
    public get roles(): Role[] {
        return this._roles;
    }
    public set roles(value: Role[]) {
        this._roles = value;
    }

    constructor(){}
}