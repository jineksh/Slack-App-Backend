import { StatusCodes } from "http-status-codes";

import AppError from "../erros/AppError.js";
import userRepo from "../repository/user.js";
import generateToken from "../utils/generateToken.js";
import CrudService from "./crudService.js";

class userService extends CrudService {

    constructor() {
        super(userRepo);
        this.repository = new userRepo();
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

            return token;
        } catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'LoginError', error);
        }
    }

}

export default userService;