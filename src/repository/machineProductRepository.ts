import HttpException from "../exceptions/httpExceptions";
import { HttpStatus } from "../httpStatus";
import machineProductModel, { IMachineProduct } from "../models/machineProductModel";



export class MachineProductRepository{

    public static async getMachineProducts(machineId: String): Promise<Array<IMachineProduct>> {
        try {
            const machineProductResult = await machineProductModel.find({machine: machineId});
            if (machineProductResult == null)
                return [];
            return machineProductResult;
        } catch (err) {
            throw err;
        }
    }

    /**
    * Update the stock of a machine.
    * If the product and the machine where not related, a new relation will be stableshed.
    * @param machineId the id of the machine to update the stock.
    * @param productId the id of the prouct of the machine.
    * @param productAmount the new amount of stock.
    */
    public static async modifyMachineStock(machienId: number, productId: number, amount: number) {
        try {
            if (amount < 0) 
                throw new HttpException(HttpStatus.BadRequest, "The stcok can't be negtive");
            await machineProductModel.findOneAndUpdate({machine: machienId, product: productId}, {stock: amount}, {upsert: true});
        } catch (err) {
            //TODO: manage known errors.
            throw err;
        }
    }

    /**
     * Modify the stock by incresing it or decresing it by amount.
     * @param machienId 
     * @param productId 
     * @param amount Negative values are alowed and will reduce the stock.
     */
    public static async decreaseOrIncreseStock(machienId: number, productId: number, amount: number) {
        try {
            if (amount < 0) 
                throw new HttpException(HttpStatus.BadRequest, "The stcok can't be negtive");
            await machineProductModel.findOneAndUpdate({machine: machienId, product: productId}, {$inc: {stock: amount}});
        } catch (err) {
            //TODO: manage known errors.
            throw err;
        }
    }
}