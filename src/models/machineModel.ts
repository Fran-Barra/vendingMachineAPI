import { Schema, model } from "mongoose"

//TODO: make the paramaeter requiered
export interface IMachine {
    readonly status: MachineStatus,
    readonly credit: number
}

export enum MachineStatus{
    ON,
    OUT_OF_SERVICE,
    ON_MAINTENANACE
}

//TODO: make status requiered
const machineSchema = new Schema<IMachine>({
    status: {type: Number, required: true},
    credit: {type: Number, required: true}
})

export default model<IMachine>('Machine', machineSchema);