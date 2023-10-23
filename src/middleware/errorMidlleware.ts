import HttpException from "exceptions/httpExceptions";
import { NextFunction, Request, Response } from "express";



function errorMidlleware(error: HttpException, req: Request, res: Response, next: NextFunction): void {
    const status = error.status || 500;
    const message = error.message || 'something went wrong';

    res.status(status).send({'status':status, 'message':message})
}

export default errorMidlleware;