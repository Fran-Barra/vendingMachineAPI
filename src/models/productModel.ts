import { Schema, model } from "mongoose"

export interface IProduct{
    name: String
    price: number
}

const productSchema = new Schema<IProduct>({
    name: {type: String, required: true, unique: true},
    price: {type: Number, require: true}
})

export default model<IProduct>("Product", productSchema)