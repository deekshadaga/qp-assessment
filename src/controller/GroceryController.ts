import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { GroceryItem } from "../entity/Grocery"

export class GroceryController {

    private groceryRepository = AppDataSource.getRepository(GroceryItem)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.groceryRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const item = await this.groceryRepository.findOne({
            where: { id }
        })

        if (!item) {
            return "unregistered item"
        }
        return item
    }

    async add(request: Request, response: Response, next: NextFunction) {
        const { name, price,quantity } = request.body;

        const item = Object.assign(new GroceryItem(), {
            name,
            price,
            quantity
        })

        return this.groceryRepository.save(item)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const itemToRemove = await this.groceryRepository.findOneBy({ id })

        if (!itemToRemove) {
            throw Error("Grocery item does not exist") 
        }
        
        await this.groceryRepository.remove(itemToRemove)

        return "Grocery item has been removed"
    }
    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { name, price,quantity } = request.body;
        const item = await this.groceryRepository.findOne({
            where: { id }
        })

        if (!item) {
            return "unregistered item"
        }
        await this.groceryRepository.update(id,request.body)

        return "Grocery item has been updated"
    }

}