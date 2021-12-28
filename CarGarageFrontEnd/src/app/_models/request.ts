import { Car } from "./car";


export interface Request {
    requestId:number;
    fromName: string;
    fromEmail: string;
    fromAddress: string
    fromMobilePhone: string;
    total:number;
    requestDate: Date;
    vehicles: Car[];
    vehiclesIds:number[];
}