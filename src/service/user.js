import { StatusCodes } from "http-status-codes";

import AppError from "../erros/AppError.js";
import emailProducer from "../producers/email.js";
import userRepo from "../repository/user.js";
import generateToken from "../utils/generateToken.js";
import CrudService from "./crudService.js";

class userService extends CrudService {

    constructor() {
        super(userRepo);
        this.repository = new userRepo();
    }



    async singUp(data){
        try {
            const user = await this.repository.create(data);
            console.log(user);
            emailProducer({
                to: user.email,
                subject: "Welcome!",
                text: `Hello ${user.name}, welcome to our app!`
            });
            return user;
        } catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'SignUpError', error);
        }
    }


    async login(email, password) {
        try {
            const user = await this.repository.getByEmail(email);
            if (!user) {
                throw new AppError('User not found', StatusCodes.NOT_FOUND, 'NotFound');
            }

            const isMatch = await user.checkPassword(password);
            if (!isMatch) {
                throw new AppError('Invalid password', StatusCodes.UNAUTHORIZED, 'InvalidPassword');
            }
            const token = generateToken(user);
            return {token,user};
        } catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'LoginError', error);
        }
    }

}

export default userService;