import * as mqtt from 'mqtt';
import { BufferAdapter } from './BufferAdapter';


//TODO: manage mqtt errors
export class MqttClient{
    private readonly client;
    private readonly PATH: String = "VendingMachine"

    private readonly messageReciber: BufferAdapter = new BufferAdapter(this);
    private readonly topicMethod: Map<String, (messae: Buffer) => void> =
        new Map<String, (messae: Buffer) => void>([
            [`${this.PATH}/init`, this.messageReciber.initializeMachine],
            [`${this.PATH}/status`, this.messageReciber.updateStatus],
            [`${this.PATH}/stock`, this.messageReciber.updateStock],
            [`${this.PATH}/stock/product/buy`, this.messageReciber.boughtProduct],
            [`${this.PATH}/credit`, this.messageReciber.updateCredit]
        ]);

    constructor(){
        const MQTT_PATH = process.env.MQTT_PATH;
        this.client = mqtt.connect(`mqtt://${MQTT_PATH}`);
        this.client.on("connect", ()=>{this.configureMqttClient()});
    }

    public sendMessage<T>(theme: string, payload: T) {
        const serializedData = JSON.stringify(payload);
        this.client.publish(this.PATH+theme, serializedData);
    }

    private configureMqttClient() {
        this.subscribe();
        this.client.on('message', (topic, message)=>{this.messageManager(topic, message)});
    }

    private subscribe() {
        this.client.subscribe(`${this.PATH}/#`)
    }

    private messageManager(topic: String, message: Buffer){
        console.log(`topic: ${topic} message: ${message}`);
        
        const topicCallBack: ((messae: Buffer) => void) | undefined = this.topicMethod.get(topic)
        if (topicCallBack === undefined) {
            console.log("This toppic is not mannaged")
            return
        }
        topicCallBack.call(this.messageReciber, message)
    }
}