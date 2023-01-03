import { ParlamentarPresence } from "./parlamentar-presence.model";
import { RoleInSession } from "./role-session.model";
import { SpeakerSession } from "./speaker-session.model";
import { Subject } from "./subject.model";
import { Voting } from "./voting.model";

export class Session{

    uuid: string;
    saplId: number;
    name: string;
    parlamentarPresenceList: ParlamentarPresence[];
    votingList: Voting[];
    subjectList: Subject[];
    speakerList: SpeakerSession[];
    roleInSessionList: RoleInSession[];
    date: Date;
    speakerOrder: number;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
}