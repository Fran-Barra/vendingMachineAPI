import { ProductRepository } from "../repository/productRepository";
import { IMachineProductDTO } from "../dto/machineProductDTO";
import { IMachineProduct } from "../models/machineProductModel";
import { MachineProductRepository } from "../repository/machineProductRepository";



export class MachineProductService{
    /**
     * This method will update the stock reducing it by one.
     * @param machineId The id of the mahcine where the product was bought.
     * @param productId The id of the product that was bought.
     */
    public static async productSoldInMachine(machineId: string, productId: string): Promise<void> {
        try {
            await MachineProductRepository.decreaseOrIncreseStock(machineId, productId, -1);
        } catch (err) {
            //TODO: manage known erros.
            throw err;
        }
    }

    public static async modelsToDTO(machineProducts: Array<IMachineProduct>): Promise<Array<IMachineProductDTO>> {
        const dtos: Array<IMachineProductDTO> = new Array<IMachineProductDTO>
        
        for (let i = 0; i < machineProducts.length; i++) {
            const p = machineProducts[i];
            const product = await ProductRepository.getProductByID(p.product.toString());
            dtos.push({
                machine: p.machine,
                product: product,
                stock: p.stock
            })
        }

        return dtos; 
    }
}