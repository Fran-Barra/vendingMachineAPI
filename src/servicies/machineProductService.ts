import { MachineProductRepository } from "repository/machineProductRepository";
import { MachineRepository } from "repository/machineRepository";



export class MachineProductService{
    /**
     * This method will update the stock reducing it by one.
     * @param machineId The id of the mahcine where the product was bought.
     * @param productId The id of the product that was bought.
     */
    public static async productSoldInMachine(machineId: number, productId: number): Promise<void> {
        try {
            await MachineProductRepository.decreaseOrIncreseStock(machineId, productId, -1);
        } catch (err) {
            //TODO: manage known erros.
            throw err;
        }
    }
}