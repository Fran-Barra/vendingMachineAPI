import express, {Application} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import Controller from 'controller/controller';
import errorMiddleware from 'middleware/errorMidlleware';


export class App{
    private app: Application;
    private port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port

        this.initialiseDatabaseConnection();
        this.initializeMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    public async listen(){
        await this.app.listen(this.port, ()=>{
            console.log(`App listening on port ${this.port}`);
        });
    }

    private initialiseDatabaseConnection(): void{
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH} = process.env;
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`);
    }

    private initializeMiddleware(): void {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.app.use('/api', controller.router)
        })
    }

    private initialiseErrorHandling(): void {
        this.app.use(errorMiddleware);
    }
}
