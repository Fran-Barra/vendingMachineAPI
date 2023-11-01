import machineModel, {IMachine, MachineStatus} from "../models/machineModel"


export class MachineRepository{
    public static save(machine: IMachine): void{
        new machineModel(machine).save()
    }

    public static async getAllMachines(): Promise<Array<IMachine>> {
        try {
            return await machineModel.find({})
        }catch(err) {
            //TODO: manage error
            throw err;
        }
    }

    public static async getMachineById(machineId: number){
        try {
            return await machineModel.findById(machineId);
        } catch (err) {
            //TODO: manage error
            throw err;
        }
    }

    public static modifyMachineStock(machineId: number, productId: number, productAmount: number): void {
        throw new Error("Not implemented error");
    }

    public static async modifyMachineStatus(machineId: number, machineStatus: MachineStatus): Promise<void> {
        try {
            await machineModel.findOneAndUpdate({_id: machineId}, {status: machineStatus})
        }catch (err){
            //TODO: manage error
            throw err;
        }
    }

    public static async increaseOrDecreaseCreditOfMachine(machineId: number, creditUpdate: number): Promise<void> {
        try {
            await machineModel.findOneAndUpdate({_id: machineId}, {$inc: {credit: creditUpdate}});
        }catch (err){
            //TODO: manage error
            throw err;
        }
    }
}