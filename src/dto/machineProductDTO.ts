import { Types } from "mongoose";

export interface IMachineProductDTO {
    machine: Types.ObjectId;
    product: Types.ObjectId;
    productName: String;
    stock: number;
}