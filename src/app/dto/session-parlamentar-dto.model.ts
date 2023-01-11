import { SpeakerSession } from "../domain/speaker-session.model";
import { Voting } from "../domain/voting.model";

export class SessionParlamentarDTO{
    
    uuid: string;
    saplId: number;
    name: string;
    speakerSessionList: SpeakerSession[];
    sessionSubjectURL: string;
    voting: Voting;

}