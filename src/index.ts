import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { port } from "./config"
import { GroceryItem } from "./entity/Grocery"
import { UserRoutes } from "./routes/userRoutes"
import { GroceryRoutes } from "./routes/groceryRoutes"


function handleError(err, req, res, next){
    res.status(err.statusCode || 500).send({message: err.message});
}
AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    // register express routes from defined application routes
    UserRoutes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try{
                const result = await (new (route.controller as any))[route.action](req, res, next)
                res.json(result)}
            catch(error){
                next(error);
            }
        })
    })
    GroceryRoutes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try{
                const result = await (new (route.controller as any))[route.action](req, res, next)
                res.json(result)}
            catch(error){
                next(error);
            }
        })
    })
    app.use(handleError);
    // setup express app here
    // ...

    // start express server
    app.listen(port);

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            userName: "DeekshaDaga",
            password: "qpAssessment@123",
            is_admin: true
        })
    )
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            userName: "AnujaVashisht",
            password: "qpAssessment@123",
            is_admin: false
        })
    )
    await AppDataSource.manager.save(
        AppDataSource.manager.create(GroceryItem, {
            name: "Pen",
            price: 10,
            quantity: 100
        })
    )
    await AppDataSource.manager.save(
        AppDataSource.manager.create(GroceryItem, {
            name: "notebook",
            price: 100,
            quantity: 50
        })
    )
    console.log(`Server started on port ${port}.`)

}).catch(error => console.log(error))
