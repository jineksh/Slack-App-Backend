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



    async singUp(data) {
        try {
            const user = await this.repository.singUp(data);
            console.log(user);
            emailProducer({
                to: user.email,
                subject: "Welcome!",
                text: `Hello ${user.name}, welcome to our app!`
            });
            
            if(user.varificationLink){
                emailProducer({
                    to: user.email,
                    subject: "Verify your email",
                    text: `Please verify your email by clicking on the following link: ${user.varificationLink}`
                });
            }
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
            return { token, user };
        } catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'LoginError', error);
        }
    }


    async varifyUser(varificationCode) {
        try {
            const user = await this.repository.getByCode(varificationCode);
            if (!user) {
                throw new AppError('User not found', StatusCodes.NOT_FOUND, 'NotFound');
            }

            if (user.isVarified) {
                throw new AppError('User already verified', StatusCodes.BAD_REQUEST, 'AlreadyVerified');
            }

            if (user.varificationCode !== varificationCode) {
                throw new AppError('Invalid verification code', StatusCodes.BAD_REQUEST, 'InvalidVerificationCode');
            }

            if(user.createdAt < Date.now() - 24 * 60 * 60 * 1000) {
                throw new AppError('Verification code expired', StatusCodes.BAD_REQUEST, 'VerificationCodeExpired');
            }

            user.isVarified = true;
            user.varificationCode = null;
            user.varificationLink = null;
            await user.save();
            return user;
        } catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'VerifyUserError', error);
        }
    }

}

export default userService;