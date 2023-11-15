import Controller from "./controller";import { HttpStatus } from "../httpStatus";
import HttpException from "../exceptions/httpExceptions";
import { MachineService } from '../servicies/machineService'
import e, { NextFunction, Request, Response, Router } from "express";
import { MachineRepository } from "../repository/machineRepository";
import { MachineProductRepository } from "../repository/machineProductRepository";
import { MachineDTO } from "dto/machineDTO";
import { MachineSells } from "../repository/machineSellsRepo";
import { MachineProductService } from "../servicies/machineProductService";

export class MachineController implements Controller {
    path: String = "/machine";
    router: Router = Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        //TODO: initialize router (el flaco aca hace un par de cosas raras)
        this.router.route(`${this.path}`)
            .post(this.crete)
            .get(this.get);

        this.router.route(`${this.path}/:id/products`).get(this.getMachineProducts);
        this.router.route(`${this.path}/:id/stats`).get(this.getMachineStats);
        this.router.route(`${this.path}/:id`).get(this.getWithId);
    }

    private async crete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const machineDTO: MachineDTO = req.body;            
            const machine = await MachineService.createAndSave(machineDTO);
            res.status(HttpStatus.Created).json(machine);
        } catch (err){
            if (err instanceof HttpException) next(err)
            else next(new HttpException(HttpStatus.BadRequest, 'Canot create machine'));
        }
    }

    /**
     * Return all the existing machines basic information.
     * @param req 
     * @param res 
     * @param next 
     */
    private async get(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            res.status(HttpStatus.OK).json(await MachineRepository.getAllMachines());
        } catch (err) {
            //TODO: manage known errors.
            next(err);
        }
    }

    /**
     * Return the basic information of a specific machine.
     * @param req 
     * @param res 
     * @param next 
     */
    private async getWithId(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            if (req.params.id == null) throw new HttpException(HttpStatus.BadRequest, 'missing id')          
            const machineId: String = req.params.id 
                       
            res.status(HttpStatus.OK).json(await MachineRepository.getMachineById(machineId))
        } catch (err) {
            //TODO: manage known errors.
            next(err);
        }
    }

    /**
     * Returns the product related to the machine and their respective stock.
     * @param req 
     * @param res 
     * @param next 
     */
    private async getMachineProducts(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try{
            if (req.params.id == null) throw new HttpException(HttpStatus.BadRequest, 'missing id');        
            const machineId: String = req.params.id;
            const products = await MachineProductRepository.getMachineProducts(machineId);
            const productsDTO = await MachineProductService.modelsToDTO(products);
            res.status(HttpStatus.OK).json({"products": productsDTO});
        } catch (err) {
            //TODO: manage known errors.
            next(err);
        }
    }

    /**
     * It return stats of the machine, such an earning in a certain amount of time.
     * (Could include wich products were bought more and how was the inventory in a certain range) 
     */
    private async getMachineStats(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try{
            if (req.params.id == null) throw new HttpException(HttpStatus.BadRequest, 'missing id');         
            const machineId: String = req.params.id;

            const sells = await MachineSells.getMachineSellsById(machineId.toString());
            const earnings = await MachineSells.getMachineEarnings(machineId.toString());

            res.status(HttpStatus.OK).json({"totalEarnings":earnings, "sells":sells})
        } catch (err) {
            next(err)
        }
    }
}