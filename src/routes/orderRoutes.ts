import { OrderController } from "../controllers/OrderController";

export const OrderRoutes = [{
    method: "get",
    route: "/getAllOrders",
    controller: OrderController,
    action: "all"
},{
    method: "post",
    route: "/placeOrder",
    controller: OrderController,
    action: "place"
}]