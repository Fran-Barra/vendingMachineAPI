import { IMachine } from 'models/machineModel';
import { MachineFactory } from '../factory.ts/machineFactory';
import { MachineRepository } from '../repository/machineRepository';
import HttpException from '../exceptions/httpExceptions';
import { MachineDTO } from 'dto/machineDTO';
import { IProduct } from 'models/productModel';
import { ProductRepository } from '../repository/productRepository';
import { HttpStatus } from '../httpStatus';
import { MachineProductRepository } from '../repository/machineProductRepository';
import { MachineSells } from '../repository/machineSellsRepo';


export class MachineService {
    //TODO: this should be a transaction
    public static async BoughtProductOfMachine(idManchine: String, idProduct: String): Promise<void> {
        try {
            //TODO: check machine credit
            const machine: IMachine = await MachineRepository.getMachineById(idManchine);
            const product: IProduct = await ProductRepository.getProductByID(idProduct);
            if (machine.credit < product.price) throw new HttpException(HttpStatus.BadRequest, "Not enought money");

            this.increaseOrDecreaseCreditOfMachine(idManchine, -product.price);
            MachineProductRepository.decreaseOrIncreseStock(idProduct, idProduct, 1);

            MachineSells.saveSellOfMAchine(idManchine.toString(), idProduct.toString())
        }catch (err) {
            throw err
        }

    }

    public static async createAndSave(machineDTO: MachineDTO): Promise<IMachine> {
        //TODO: subscrive to events of machine
        try {
            const machine = MachineFactory.createMachine(machineDTO);            
            await MachineRepository.save(machine);
            return machine;
        }catch (err) {
            console.log(err)
            if (err instanceof HttpException) throw err;
            else throw new Error("Unacble to create machine");
        }
    }

    /**
     * Modify the credit of the machine.
     * @param machineId the id of the machine.
     * @param creditUpdate the amount of increase or decrease of credit. 
     */
    public static async increaseOrDecreaseCreditOfMachine(machineId: String, creditUpdate: number): Promise<void> {
        //TODO: ADD HISTORY FUNCIONaLITY.
        try {
            await MachineRepository.increaseOrDecreaseCreditOfMachine(machineId, creditUpdate);
        } catch (err) {
            //TODO: manage errors
            throw err;
        }
    }
}