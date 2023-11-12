import HttpException from "../exceptions/httpExceptions";
import { MachineDTO } from "../dto/machineDTO";
import { IMachine, MachineInitData } from "../models/machineModel";
import { IMachineProduct } from "../models/machineProductModel";
import { HttpStatus } from "../httpStatus";
import { MachineProductRepository } from "../repository/machineProductRepository";
import { ProductRepository } from "../repository/productRepository";
import { IProduct } from "../models/productModel";
import { MachineRepository } from "../repository/machineRepository";


export class MachineFactory{
    public static createMachine(machineDTO: MachineDTO): IMachine {
        if (machineDTO.status == null) throw new HttpException(HttpStatus.BadRequest, 'status is needed')
        return {
            status: machineDTO.status,
            credit: 0,
            products: [] as IMachineProduct[]
        };
    }

    public static async getMachineInitData(machineId: string): Promise<MachineInitData> {
        const machineProducts: IMachineProduct[] = await MachineProductRepository.getMachineProducts(machineId);
        var esp_stock = 0;
        var proto_stock = 0;
        var led_stock = 0;
        var pusher_stock = 0;
        for (let p = 0; p < machineProducts.length; p++) {
            const machineProduct = machineProducts[p];
            let product: IProduct = await ProductRepository.getProductByID(machineProduct.product.toString());
            if (product.name == "ESP") esp_stock = machineProduct.stock
            if (product.name == "Protoboard") proto_stock = machineProduct.stock
            if (product.name == "Led") led_stock = machineProduct.stock
            if (product.name == "Pusher") pusher_stock = machineProduct.stock
        }

        const machine: IMachine = await MachineRepository.getMachineById(machineId);
        return {
            credit: machine.credit, 
            esp_stock: esp_stock,
            proto_stock: proto_stock,
            led_stock: led_stock,
            pusher_stock: pusher_stock
        }
    }
}