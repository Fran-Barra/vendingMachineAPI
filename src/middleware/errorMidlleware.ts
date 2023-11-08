import HttpException from "../exceptions/httpExceptions";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../httpStatus";



function errorMidlleware(error: Error, req: Request, res: Response, next: NextFunction): void {
    const InternalServerErrorMessage: String = `something went wrong`;
    console.log(error);
    if (error instanceof HttpException) {
        const status = error.status || HttpStatus.InternalServerError;
        const message = error.message || InternalServerErrorMessage;

        res.status(status).send({'status':status, 'message':message})
    } else {
        res.status(HttpStatus.InternalServerError).
            send({"status": HttpStatus.InternalServerError, "message":InternalServerErrorMessage })
    }

}

export default errorMidlleware;