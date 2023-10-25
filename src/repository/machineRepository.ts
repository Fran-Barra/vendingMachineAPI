import machineModel, {IMachine} from "models/machineModel"


export class MachineRepository{
    public static save(machine: IMachine): void{
        new machineModel(machine).save()
    }
}