import { ParlamentarVoting } from "./parlamentar-voting.model";
import { Session } from "./session.model";
import { Subject } from "./subject.model";


export class Voting{
    
    id: number;
    session: Session;
    subjectList: Subject[];
    parlamentarVotingList: ParlamentarVoting[];
    status: string;

}