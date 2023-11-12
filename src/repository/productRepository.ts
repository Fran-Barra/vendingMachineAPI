import HttpException from "../exceptions/httpExceptions";
import { HttpStatus } from "../httpStatus";
import productModel, { IProduct } from "../models/productModel";



export class ProductRepository{
    public static async getProductByID(Id: String): Promise<IProduct> {
        try {
            const product = await productModel.findById(Id)
            if (product === null)
                throw new HttpException(HttpStatus.NotFound, "The machine with the given Id was not found");
            return product;
        } catch (err) {
            throw err
            //TODO: manage known errors
        }
    }
}