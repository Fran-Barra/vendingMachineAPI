import { IProduct } from "models/productModel";
import { Types } from "mongoose";

export interface IMachineProductDTO {
    machine: Types.ObjectId;
    product: IProduct
    stock: number;
}