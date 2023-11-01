import Controller from "./controller";import { HttpStatus } from "../httpStatus";
import HttpException from "../exceptions/httpExceptions";
import { MachineService } from '../servicies/machineService'
import { NextFunction, Request, Response, Router } from "express";
import { MachineRepository } from "repository/machineRepository";
import { MachineProductRepository } from "repository/machineProductRepository";

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
            const machineDTO = req.body;
            const machine = await MachineService.createAndSave(machineDTO);
            res.status(HttpStatus.OK).json(machine);
        } catch (err){
            next(new HttpException(HttpStatus.BadRequest, 'Canot create machine'));
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
            res.status(HttpStatus.OK).json(MachineRepository.getAllMachines());
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
            const machineId: number = this.getIdParam(req);
            res.status(HttpStatus.OK).json(MachineRepository.getMachineById(machineId))
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
            const machienId: number = this.getIdParam(req);
            res.status(HttpStatus.OK).json({"products": MachineProductRepository.getMachineProducts(machienId)});
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
        throw new Error("Not implemented erro")
    }

    /**
     * Get id from request param
     * @param req 
     * @returns the id or an BadRequestError
     */
    private getIdParam(req: Request): number {
        const machineIdOptional: number = Number(req.params.id);
        if (isNaN(machineIdOptional)) 
            throw new HttpException(HttpStatus.BadRequest, "Id of the machine must be a valid number");
        return machineIdOptional;
    }
}