import { Types } from "mongoose";
import { MachineDTO } from "../dto/machineDTO";
import { IMachine } from "../models/machineModel";
import { IMachineProduct } from "models/machineProductModel";


export class MachineFactory{
    public static createMachine(machineDTO: MachineDTO): IMachine {
        return {
            status: machineDTO.status,
            credit: 0,
            products: [] as IMachineProduct[]
        };
    }
}