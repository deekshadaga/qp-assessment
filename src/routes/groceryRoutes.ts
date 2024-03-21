import { GroceryController } from "../controllers/GroceryController"

export const GroceryRoutes = [{
    method: "get",
    route: "/getAllGroceryItems",
    controller: GroceryController,
    action: "all"
},{
    method: "get",
    route: "/getGroceryItemById/:id",
    controller: GroceryController,
    action: "one"
},{
    method: "post",
    route: "/addGroceryItem",
    controller: GroceryController,
    action: "add"
}, {
    method: "delete",
    route: "/removeGroceryItem/:id",
    controller: GroceryController,
    action: "remove"
},
{
    method: "put",
    route: "/updateGroceryItem/:id",
    controller: GroceryController,
    action: "update"
}
]