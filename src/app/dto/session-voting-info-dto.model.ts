import { SpeakerSession } from "../domain/speaker-session.model";
import { Voting } from "../domain/voting.model";
import { ParlamentarInfoStatusDTO } from "./parlamentar-info-status-dto.model";

export class SessionVotingInfoDTO{
    
    sessionUUID: string;
    voting: Voting;
    parlamentarTableList: ParlamentarInfoStatusDTO[];
    parlamentarList: ParlamentarInfoStatusDTO[];
    speakerList: SpeakerSession[];
}