import { ParlamentarVoting } from "./parlamentar-voting.model";
import { Session } from "./session.model";
import { Subject } from "./subject.model";


export class Voting{
    
    id: number;
    session: Session;
    subjectList: Subject[];
    parlamentarVotingList: ParlamentarVoting[];
    status: string;
    yesCount: number = 0;
    noCount: number = 0;
    abstentionCount: number = 0;
    result : string;
    description: string;
}