import { MachineStatus } from "../models/machineModel";

function fromStringToMachineStatusEnum(str: String): MachineStatus {
    switch (str.toLowerCase()){
        case "on": return MachineStatus.ON
        case "on_maintenance": return MachineStatus.ON_MAINTENANACE
        case "out_of_service": return MachineStatus.OUT_OF_SERVICE
        default: throw new Error(`parse error, not valid str to enum: ${str}`)
    }
}