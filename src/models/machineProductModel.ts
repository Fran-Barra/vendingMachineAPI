import { Schema, model, Types } from "mongoose";

export interface IMachineProduct {
  machine: Types.ObjectId;
  product: Types.ObjectId;
  stock: number;
}

const machineProductSchema = new Schema<IMachineProduct>({
  machine: { type: Schema.Types.ObjectId, ref: "Machine", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  stock: { type: Number, default: 0 },
});

export default model<IMachineProduct>("MachineProduct", machineProductSchema);
