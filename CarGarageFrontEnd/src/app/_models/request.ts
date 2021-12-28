import { Car } from "./car";


export interface Request {
    fromName: string;
    fromEmail: string;
    fromAddress: string
    fromMobilePhone: string;
    requestDate: Date;
    vehicles: Car[];
    vehiclesIds:number[];
}