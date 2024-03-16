import { GroceryController } from "../controller/GroceryController"
import { UserController } from "../controller/UserController"

export const UserRoutes = [{
    method: "get",
    route: "/getAllusers",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/getUserById/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/addUser",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/removeUserById/:id",
    controller: UserController,
    action: "remove"
}
]