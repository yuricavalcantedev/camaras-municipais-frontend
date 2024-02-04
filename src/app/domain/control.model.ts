import { EControlType } from "../dto/control-type.enum";

export class Control {

    id: number;
    type: EControlType;
    command: string;
    parliamentaryUsername: string;

    constructor(){}
}