import mqtt from 'mqtt';
import { BufferAdapter } from './BufferAdapter';


//TODO: manage mqtt errors
export class MqttClient{
    private readonly client;
    private readonly PATH: String = "VendingMachine"

    private readonly messageReciber: BufferAdapter = new BufferAdapter();
    private readonly topicMethod: Map<String, (messae: Buffer) => void> =
        new Map<String, (messae: Buffer) => void>([
            [`${this.PATH}/status`, this.messageReciber.updateStatus],
            [`${this.PATH}/stock/#`, this.messageReciber.updateStock]
        ]);

    constructor(){
        const MQTT_PATH = process.env;
        this.client = mqtt.connect(`mqtt://${MQTT_PATH}`);
        this.client.on("connect", this.configureMqttClient);
    }

    private configureMqttClient() {
        this.subscribeToTopict();
        this.setMessageManager();
    }

    private subscribeToTopict(){
        this.client.subscribe(`${this.PATH}/status`);
        this.client.subscribe(`${this.PATH}/stock/#`);
        //TODO: /credit me manda el incremento.
        this.client.subscribe(`${this.PATH}/credit/#`);
        this.client.subscribe(`${this.PATH}/price/#`);
    }

    private setMessageManager(){
        this.client.on('message', this.messageManager);
    }

    private messageManager(topic: String, message: Buffer){
        const topicCallBack: ((messae: Buffer) => void) | undefined = this.topicMethod.get(topic)
        if (topicCallBack === undefined) 
            throw new Error("Unexpected topic");
        topicCallBack.call(this.messageReciber, message)
    }
}