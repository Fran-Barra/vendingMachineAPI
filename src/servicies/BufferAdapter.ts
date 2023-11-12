import { MachineRepository } from "../repository/machineRepository"
import { MachineService } from "./machineService";
import { MqttClient } from "./mqttService";
import { MachineInitData } from "models/machineModel";
import { MachineFactory } from "../factory.ts/machineFactory";


export class BufferAdapter{
    private readonly mqttClient;

    constructor(mqttClient: MqttClient){
        this.mqttClient = mqttClient;
    }

    public updateStatus(message: Buffer){
        try {
            const values: {status: number, machineId: String} = JSON.parse(message.toString())

            const newStatus: number = Number(values.status);
            if (isNaN(newStatus)) throw Error('wrong message send by mqtt')

            const id: String = values.machineId;
            if (id === undefined) throw Error('wrong message send by mqtt, id missing')
            MachineRepository.modifyMachineStatus(id, newStatus)
        } catch (err){
            console.log(err)
        }
    }

    public updateStock(message: Buffer){
        try {            
            const values:{machineId: string, stock: string} = JSON.parse(message.toString())

            const newAmount: number = Number(values.stock);
            if (isNaN(newAmount)) throw Error('wrong message send by mqtt')

            const id: String  | undefined = values.machineId;
            if (id === undefined) throw Error('wrong message send by mqtt, id missing')
            MachineRepository.modifyMachineStock(id, newAmount)
        } catch (err){
            console.log(err)
        }
    }

    public boughtProduct(message: Buffer) {
        try {
            const values: {productId: string, machineId: string}= JSON.parse(message.toString())

            const machineId: String  | undefined = values.machineId;
            if (machineId === undefined) throw Error('wrong message send by mqtt, mid missing');

            const productId: String  | undefined = values.productId;
            if (productId === undefined) throw Error('wrong message send by mqtt, pid missing');

            MachineService.BoughtProductOfMachine(machineId, productId);
        } catch (err){
            console.log(err)
        }
    }

    public updateCredit(message: Buffer) {
        try {
            const values: {increment: string, machineId: string}= JSON.parse(message.toString())

            const machineId: String  | undefined = values.machineId;
            if (machineId === undefined) throw Error('wrong message send by mqtt, id missing');

            const creditAmountString: String | undefined = values.increment;
            if (creditAmountString === undefined) throw Error('wrong message send by mqtt, amount missing');
            const creditAmount: number = Number(creditAmountString);
            if (isNaN(creditAmount)) throw Error(`Not valid credit amount: ${creditAmountString}`)

            MachineRepository.increaseOrDecreaseCreditOfMachine(machineId, creditAmount);
        } catch (err){
            console.log(err)
        }
    }

    public async initializeMachine(message: Buffer) {
        try {
            const machienId = message.toString();

            const data: MachineInitData = await MachineFactory.getMachineInitData(machienId)
            this.mqttClient.sendStringMessage(`/machine_init_${machienId}`, 
            `${data.credit},${data.esp_stock},${data.proto_stock},${data.led_stock},${data.pusher_stock}`)
        } catch (err){
            console.log(err)
        }
    }
}