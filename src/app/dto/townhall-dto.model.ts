export class TownHallDTO{

    private _id: number;
    public get id(): number {
        return this._id;
    }
    
    public set id(value: number) {
        this._id = value;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    private _urlImage: string;
    public get urlImage(): string {
        return this._urlImage;
    }
    public set urlImage(value: string) {
        this._urlImage = value;
    }

    private _city: string;
    public get city(): string {
        return this._city;
    }
    public set city(value: string) {
        this._city = value;
    }

    private _sessionList: any[];
    public get sessionList(): any[] {
        return this._sessionList;
    }
    public set sessionList(value: any[]) {
        this._sessionList = value;
    }
}