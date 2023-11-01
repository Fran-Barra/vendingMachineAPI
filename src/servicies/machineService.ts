import { IMachine } from 'models/machineModel';
import { MachineFactory } from '../factory.ts/machineFactory';
import { MachineRepository } from '../repository/machineRepository';


export class MachineService {

    public static createAndSave(machineDTO: IMachine): IMachine {
        //TODO: subscrive to events of machine
        try {
            const machine = MachineFactory.createMachine(machineDTO);
            MachineRepository.save(machine);
            return machine;
        }catch (err) {
            throw new Error("Unacble to create machine");
            //TODO: handle correctly this
        }
    }

    /**
     * Modify the credit of the machine.
     * @param machineId the id of the machine.
     * @param creditUpdate the amount of increase or decrease of credit. 
     */
    public static async increaseOrDecreaseCreditOfMachine(machineId: number, creditUpdate: number): Promise<void> {
        //TODO: ADD HISTORY FUNCIONaLITY.
        try {
            await MachineRepository.increaseOrDecreaseCreditOfMachine(machineId, creditUpdate);
        } catch (err) {
            //TODO: manage errors
            throw err;
        }
    }
}