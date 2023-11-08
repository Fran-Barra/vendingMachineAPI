import HttpException from "../exceptions/httpExceptions";
import { MachineDTO } from "../dto/machineDTO";
import { IMachine } from "../models/machineModel";
import { IMachineProduct } from "models/machineProductModel";
import { HttpStatus } from "../httpStatus";


export class MachineFactory{
    public static createMachine(machineDTO: MachineDTO): IMachine {
        if (machineDTO.status == null) throw new HttpException(HttpStatus.BadRequest, 'status is needed')
        return {
            status: machineDTO.status,
            credit: 0,
            products: [] as IMachineProduct[]
        };
    }
}