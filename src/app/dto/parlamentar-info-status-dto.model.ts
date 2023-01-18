import { Parlamentar } from "../domain/parlamentar.model";

export class ParlamentarInfoStatusDTO{
    
    parlamentar: Parlamentar;
    result: string;
    role: string;
    status: string;
    priority: number;
}