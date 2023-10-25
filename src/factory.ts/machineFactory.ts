import { MachineDTO } from "dto/machineDTO";
import { IMachine, MachineStatus } from "models/machineModel";


export class MachineFactory{
    public static createMachine(machineDTO: MachineDTO): IMachine {
        return {status: machineDTO.status, credit: 0};
    }
}