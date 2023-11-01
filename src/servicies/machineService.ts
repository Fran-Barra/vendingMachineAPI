import { IMachine, MachineStatus } from 'models/machineModel';
import { MachineFactory } from '../factory.ts/machineFactory';
import { MachineRepository } from '../repository/machineRepository';


export class MachineService {

    public static createAndSave(machineDTO: any): any {
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

    //TODO: it is usefull this method
    public static getAllMachines(): Array<IMachine> {
        throw new Error("Not implemented error");
    }

    /**
     * This method will update the stock reducing it by one.
     * @param machineId The id of the mahcine where the product was bought.
     * @param productId The id of the product that was bought.
     */
    public static productSoldInMachine(machineId: number, productId: number): void {
        throw new Error("Not implemented error");
        //TODO: should update stock by <ref="modifyMachineStock">
    }

    /**
     * Update the stock of a machine.
     * If the product and the machine where not related, a new relation will be stableshed.
     * @param machineId the id of the machine to update the stock.
     * @param productId the id of the prouct of the machine.
     * @param productAmount the new amount of stock.
     */
    public static modifyMachineStock(machineId: number, productId: number, productAmount: number): void {
        throw new Error("Not implemented error");
    }

    /**
     * Updates the status of the machine.
     * @param machineId the id of the machine.
     * @param machineStatus the new status of the machine.
     */
    public static modifyMachineStatus(machineId: number, machineStatus: MachineStatus): void {
        throw new Error("Not implemented error");
    }

    /**
     * Modify the credit of the machine.
     * @param machineId the id of the machine.
     * @param creditUpdate the amount of increase or decrease of credit. 
     */
    public static increaseOrDecreaseCreditOfMachine(machineId: number, creditUpdate: number): void {
        throw new Error("Not implemented error");
    }
}