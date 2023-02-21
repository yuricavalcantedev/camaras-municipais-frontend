import { LegislativeSubjectType } from "./legislative-subject.model";
import { TableRole } from "./table-role.model";
import { User } from "./user.model";

export class TownHall{
    
    id : number = 0;
    name: string = "";
    urlImage: string = "";
    city: string = "";
    legislature: string = "";
    apiURL: string = "";
    legislativeSubjectTypeList: LegislativeSubjectType[] = [];
    tableRoleList: TableRole[] = [];
    userList: User[] = [];

    constructor(){}

    buildFromFormGroup(form: any){

        this.name = form.name;
        this.urlImage = form.urlImage;
        this.city = form.city;
        this.legislature = form.legislature;
        this.apiURL = form.apiURL;
    }
}