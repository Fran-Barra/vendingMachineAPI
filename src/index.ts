import 'dotenv/config';
import validateEnv from 'servicies/validateEnv';
import {App} from './app';
import { MachineController } from 'controller/machineController';


validateEnv();
const app = new App([
    new MachineController()
], Number(process.env.PORT));
app.listen();