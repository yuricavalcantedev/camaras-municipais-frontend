import { ParlamentarPresence } from "./parlamentar-presence.model";
import { SpeakerSession } from "./speaker-session.model";
import { Subject } from "./subject.model";
import { Voting } from "./voting.model";

export class Session{

    uuid: string = "";
    saplId: number = 0;
    name: string = "";
    parlamentarPresenceList: ParlamentarPresence[] = [];
    votingList: Voting[] = [];
    subjectList: Subject[] = [];
    speakerList: SpeakerSession[] = [];
    date: Date;
    speakerOrder: number = 0;
    startTime: string = "";
    endTime: string = "";
    startDate: string = "";
    endDate: string = "";
}