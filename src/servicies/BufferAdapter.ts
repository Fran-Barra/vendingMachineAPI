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
        const values: {status: number, machineId: String} = JSON.parse(message.toString())

        const newStatus: number = Number(values.status);
        if (isNaN(newStatus)) throw Error('wrong message send by mqtt')

        const id: String = values.machineId;
        if (id === undefined) throw Error('wrong message send by mqtt, id missing')
        MachineRepository.modifyMachineStatus(id, newStatus)
    }

    public updateStock(message: Buffer){
        const values:{machineId: string, stock: string} = JSON.parse(message.toString())

        const newAmount: number = Number(values.stock);
        if (isNaN(newAmount)) throw Error('wrong message send by mqtt')

        const id: String  | undefined = values.machineId;
        if (id === undefined) throw Error('wrong message send by mqtt, id missing')
        MachineRepository.modifyMachineStock(id, newAmount)
    }

    public boughtProduct(message: Buffer) {
        const values: {productId: string, machineId: string}= JSON.parse(message.toString())


        const machineId: String  | undefined = values.machineId;
        if (machineId === undefined) throw Error('wrong message send by mqtt, mid missing');

        const productId: String  | undefined = values.productId;
        if (productId === undefined) throw Error('wrong message send by mqtt, pid missing');

        MachineService.BoughtProductOfMachine(machineId, productId);
    }

    public updateCredit(message: Buffer) {
        const values: {increment: string, machineId: string}= JSON.parse(message.toString())

        const machineId: String  | undefined = values.machineId;
        if (machineId === undefined) throw Error('wrong message send by mqtt, id missing');

        const creditAmountString: String | undefined = values.increment;
        if (creditAmountString === undefined) throw Error('wrong message send by mqtt, amount missing');
        const creditAmount: number = Number(creditAmountString);
        if (isNaN(creditAmount)) throw Error(`Not valid credit amount: ${creditAmountString}`)

        MachineRepository.increaseOrDecreaseCreditOfMachine(machineId, creditAmount);
    }

    public async initializeMachine(message: Buffer) {
        const machienId = message.toString();

        const data: MachineInitData = await MachineFactory.getMachineInitData(machienId)
        this.mqttClient.sendMessage(`/machine_init_${machienId}`, data)
    }
}