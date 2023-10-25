import { MachineFactory } from '../factory.ts/machineFactory';
import { MachineRepository } from '../repository/machineRepository';


export class MachineService {

    public static createAndSave(machineDTO: any): any {
        try {
            const machine = MachineFactory.createMachine(machineDTO);
            MachineRepository.save(machine);
            return machine;
        }catch (err) {
            throw new Error("Unacble to create machine");
            //TODO: handle correctly this
        }
    }
}