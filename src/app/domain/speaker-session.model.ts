import { Parlamentar } from "./parlamentar.model";
import { Session } from "./session.model";


export class SpeakerSession{

    id: number;
    session: Session;
    parlamentarId: number;
    parlamentarName: string;
    townHallId: number;
    speakerOrder: number;
}