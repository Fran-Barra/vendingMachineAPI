import Controller from "./controller";import { HttpStatus } from "../httpStatus";
import HttpException from "exceptions/httpExceptions";
import { MachineService } from 'servicies/machineService'
import { NextFunction, Request, Response, Router } from "express";

export class MachineController implements Controller {
    path: String = "/machine";
    router: Router = Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        //TODO: initialize router (el flaco aca hace un par de cosas raras)
        this.router.route(`${this.path}`).post(this.crete);
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

}