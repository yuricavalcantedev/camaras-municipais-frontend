import { Subject } from "../domain/subject.model";

export class SubjectVotingDTO{
    id: number;
    description: string;
    status:string;

    constructor(subject: Subject){
        
        this.id = subject.id;
        this.description = subject.description;
        this.status = subject.status;
    }
}