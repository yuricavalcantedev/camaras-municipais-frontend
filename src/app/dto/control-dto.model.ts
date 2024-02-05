import { EControlType } from "./control-type.enum";

export class ControlDTO{

    type: EControlType;
    command: string;
    townHallId: string;

    constructor(type: EControlType, command: string, townHallId: string){
        this.type = type;
        this.command = command;
        this.townHallId = townHallId;
    }
}