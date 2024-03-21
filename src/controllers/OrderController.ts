import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Order,Item } from "../entity/Order"
import axios from "axios"

export class OrderController {
    private orderRepository = AppDataSource.getRepository(Order)
    async all(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.find()
    }
    async place(request: Request, response: Response, next: NextFunction) {
        const {userName,groceryList} = request.body;
        groceryList.forEach(async (item:Item) => {
            const grocery_id = item.grocery_id
            const listedItem = await (await axios.get(`http://localhost:3000/getGroceryItemById/${grocery_id}`)).data
            if(listedItem.quantity < item.quantity){
                return ("Can't fullfill this order quantity")
            }
            else{
                axios.put(`http://localhost:3000/updateGroceryItem/${grocery_id}`, {
                    quantity: listedItem.quantity=listedItem.quantity-item.quantity
                });
            }
        });
        const item = Object.assign(new Order(), {
            userName,
            groceryList
        })

        return this.orderRepository.save(item)
     }
}


