import { Types } from "mongoose";
import { IMachineStats, ISellStat, machineStatsModel } from "../models/machineSells";
import machineModel from "../models/machineModel";
import HttpException from "../exceptions/httpExceptions";
import { HttpStatus } from "../httpStatus";
import productModel, { IProduct } from "../models/productModel";



export class MachineSells{
    public static async getMachineSellsById(machineId: string): Promise<IMachineStats> {
        try {
            const findMachieneStatsResult = await machineStatsModel.findOne({machine: machineId});
            if (findMachieneStatsResult === null)
                throw new HttpException(HttpStatus.NotFound, "The machine with the given Id was not found");
            return findMachieneStatsResult;
        } catch (err) {
            //TODO: manage error
            throw err;
        }
    }

    public static async saveSellOfMAchine(machineId: string, productId: string): Promise<void> {
        try {
            const sellStat: ISellStat = {
                product: new Types.ObjectId(productId),
                time: new Date(),
            };

            await machineModel.findOneAndUpdate(
                { machine: machineId },
                { $push: { sells: sellStat } },
                { upsert: true, new: true } 
            ).exec();

        } catch (error) {
            console.error('Error saving sell:', error);
            throw error; 
        }
    }

    public static async getMachineEarnings(machineId: string): Promise<number> {
        try {
            const findMachieneStatsResult = await machineStatsModel.findOne({machine: machineId}).exec();
            if (findMachieneStatsResult === null) return 0
            
            let totalEarnings: number = 0;

            findMachieneStatsResult.sells.forEach(async (sellStat: ISellStat) => {
                if (sellStat.product instanceof Types.ObjectId) {
                    const product = await productModel.findById(sellStat);
                    if (product) totalEarnings += product.price;
                } else {
                    totalEarnings += sellStat.product.price;
                }
            })

            return totalEarnings;
            
        } catch (err) {
            //TODO: manage error
            throw err;
        }
    }
}