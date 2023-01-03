import { Parlamentar } from "./parlamentar.model";
import { Session } from "./session.model";

export class ParlamentarPresence{
    
    id: number;
    parlamentar: Parlamentar;
    session: Session;
    townHallId: number;
    status: string;
}