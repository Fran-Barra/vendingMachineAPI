import 'dotenv/config';
import validateEnv from './servicies/validateEnv';
import {App} from './app';
import { MachineController } from './controller/machineController';
import { MqttClient } from './servicies/mqttService';
import { MachineProductController } from './controller/machineProductController';


validateEnv();
const app = new App([
    new MachineController(),
    new MachineProductController()
], Number(process.env.PORT));
app.listen();
new MqttClient();