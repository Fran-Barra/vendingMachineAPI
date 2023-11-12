import { Schema, Types, model } from "mongoose"
import { IMachineProduct } from "./machineProductModel";

//TODO: make the paramaeter requiered
export interface IMachine {
    readonly status: MachineStatus,
    readonly credit: number
    products: Array<IMachineProduct>;
}

export enum MachineStatus{
    ON,
    OUT_OF_SERVICE,
    ON_MAINTENANACE
}

const machineSchema = new Schema<IMachine>({
    status: {type: Number, required: true},
    credit: {type: Number, required: true}
})

export default model<IMachine>('Machine', machineSchema);

export interface MachineInitData{
    credit: number;
    esp_stock: number;
    proto_stock: number;
    led_stock: number;
    pusher_stock: number;  
}