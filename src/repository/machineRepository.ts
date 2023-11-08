import HttpException from "../exceptions/httpExceptions";
import machineModel, {IMachine, MachineStatus} from "../models/machineModel"
import { HttpStatus } from "../httpStatus";
import machineProductModel from "../models/machineProductModel";


export class MachineRepository{
    public static async save(machine: IMachine): Promise<void> {
        console.log("save result:");
        const result = await new machineModel(machine).save()
        console.log(result);
        
    }

    public static async getAllMachines(): Promise<Array<IMachine>> {
        try {
            return await machineModel.find({})
        }catch(err) {
            //TODO: manage error
            throw err;
        }
    }

    public static async getMachineById(machineId: String): Promise<IMachine> {
        try {
            const findMachieneResult = await machineModel.findById(machineId);
            if (findMachieneResult === null)
                throw new HttpException(HttpStatus.NotFound, "The machine with the given Id was not found");
            return findMachieneResult;
        } catch (err) {
            //TODO: manage error
            throw err;
        }
    }

    public static modifyMachineStock(machineId: String, productAmount: number): void {
        try {
            machineProductModel.findByIdAndUpdate({machine: machineId}, {stock: productAmount})
        } catch (err) {
            //TODO: manage error
            throw err;
        }
    }

    public static async modifyMachineStatus(machineId: String, machineStatus: MachineStatus): Promise<void> {
        try {
            await machineModel.findOneAndUpdate({_id: machineId}, {status: machineStatus})
        }catch (err){
            //TODO: manage error
            throw err;
        }
    }

    public static async increaseOrDecreaseCreditOfMachine(machineId: String, creditUpdate: number): Promise<void> {
        try {
            await machineModel.findOneAndUpdate({_id: machineId}, {$inc: {credit: creditUpdate}});
        }catch (err){
            //TODO: manage error
            throw err;
        }
    }
}