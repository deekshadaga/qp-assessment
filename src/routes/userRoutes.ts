import { GroceryController } from "../controllers/GroceryController"
import { UserController } from "../controllers/UserController"

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
},
{
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
}
]