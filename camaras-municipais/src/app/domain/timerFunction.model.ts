
//time always in seconds
export class TimerFunction{
    
    id: number;
    name: string;
    description: string;
    timer: number;

    constructor(name: string, timer : number, description? : string){
        this.name = name;
        this.timer = timer;
        if(description !== null && description !== undefined){
            this.description = description;
        }
    }

}