import { IMachineProductDTO } from "../dto/machineProductDTO";
import HttpException from "../exceptions/httpExceptions";
import { HttpStatus } from "../httpStatus";
import machineProductModel, { IMachineProduct } from "../models/machineProductModel";
import { ProductRepository } from "./productRepository";



export class MachineProductRepository{

    public static async getMachineProducts(machineId: String): Promise<Array<IMachineProductDTO>> {
        try {
            const machineProductResult = await machineProductModel.find({machine: machineId});
            if (machineProductResult == null)
                return [];
            return await this.modelsToDTO(machineProductResult);
        } catch (err) {
            throw err;
        }
    }

    private static async modelsToDTO(machineProducts: Array<IMachineProduct>): Promise<Array<IMachineProductDTO>> {
        const dtos: Array<IMachineProductDTO> = new Array<IMachineProductDTO>
        console.log("machines amount: " + machineProducts.length);
        
        for (let i = 0; i < machineProducts.length; i++) {
            const p = machineProducts[i];
            const porduct = await ProductRepository.getProductByID(p.product.toString());
            dtos.push({
                machine: p.machine,
                product: p.product,
                productName: porduct.name,
                stock: p.stock
            })
        }

        console.log("dot lenght: " + dtos.length)
        return dtos; 
    }

    /**
    * Update the stock of a machine.
    * If the product and the machine where not related, a new relation will be stableshed.
    * @param machineId the id of the machine to update the stock.
    * @param productId the id of the prouct of the machine.
    * @param productAmount the new amount of stock.
    */
    public static async modifyMachineStock(machienId: string, productId: string, amount: number) {
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
    public static async decreaseOrIncreseStock(machienId: String, productId: String, amount: number) {
        try {
            await machineProductModel.findOneAndUpdate({machine: machienId, product: productId}, {$inc: {stock: amount}});
        } catch (err) {
            //TODO: manage known errors.
            throw err;
        }
    }
}