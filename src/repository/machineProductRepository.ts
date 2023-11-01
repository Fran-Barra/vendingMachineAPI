import machineProductModel, { IMachineProduct } from "models/machineProductModel";



export class MachineProductRepository{

    public static async getMachineProducts(machineId: number): Promise<Array<IMachineProduct>> {
        try {
            const machineProductResult = await machineProductModel.find({machine: machineId});
            if (machineProductResult == null)
                return [];
            return machineProductResult;
        } catch (err) {
            throw err;
        }
    }
}