import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { userName, password,is_admin } = request.body;
        const user = Object.assign(new User(), {
            userName,
            password,
            is_admin
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            throw Error("User does not exist") 
        }
        
        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}