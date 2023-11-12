import { NextFunction, Router, Response, Request } from "express";
import Controller from "./controller";
import { MachineProductRepository } from "../repository/machineProductRepository";
import HttpException from "../exceptions/httpExceptions";
import { HttpStatus } from "../httpStatus";




export class MachineProductController implements Controller {
    path: String = "/machineProduct";
    router: Router = Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.route(`${this.path}/addProductToMachine/:idMachine/:idProduct`).post(this.addProducToMachine);
    }

    private async addProducToMachine(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try{
            if (req.params.idMachine == null) throw new HttpException(HttpStatus.BadRequest, 'missing idMachine')          
            const machineId: String = req.params.idMachine

            if (req.params.idProduct == null) throw new HttpException(HttpStatus.BadRequest, 'missing idProduct')          
            const productId: String = req.params.idProduct 
    
            await MachineProductRepository.modifyMachineStock(machineId.toString(), productId.toString(), 0);

            res.status(HttpStatus.Created).json({});
        } catch (err) {
            if (err instanceof HttpException) next(err)
            else next(new HttpException(HttpStatus.BadRequest, 'Canot create association'));
        }
    }
}