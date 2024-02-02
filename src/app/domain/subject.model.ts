import { Session } from "./session.model";
import { Voting } from "./voting.model";

export class Subject{

    id: number;
    session: Session;
    voting: Voting;
    description: string;
    status: string;
    saplMateriaId: number;
    originalTextUrl: string;
}