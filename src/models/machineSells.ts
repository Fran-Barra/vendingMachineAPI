import { Schema, Types, model } from "mongoose"
import { IProduct } from "./productModel"

export interface IMachineStats{
    machine: Types.ObjectId
    sells: ISellStat[]
}

export interface ISellStat{
    product: Types.ObjectId | IProduct
    time: Date
}

const SellStatSchema = new Schema<ISellStat>({
    product: { type: Schema.Types.ObjectId, ref: "Product" ,required: true },
    time: { type: Date, required: true },
});

const MachineStatsSchema = new Schema<IMachineStats>({
    machine: { type: Schema.Types.ObjectId, required: true },
    sells: { type: [SellStatSchema], required: true },
});

export const machineStatsModel = model<IMachineStats>('MachineStats', MachineStatsSchema);