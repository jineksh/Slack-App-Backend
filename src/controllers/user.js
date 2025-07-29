import { StatusCodes } from "http-status-codes";

import userService from "../service/user.js";
import { errorResponse,successResponse } from '../utils/apiResponse.js';
const service = new userService();

async function signUp(req,res){
    try {
        const user = await service.create({
            email : req.body.email,
            password : req.body.password,
            name : req.body.name
        });
        console.log(user);
        return successResponse(res, user, "User registered successfully", StatusCodes.CREATED); 
    } catch (error) {
         return errorResponse(
            res,
            error.message,
            error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            error.name || "SignUpError",
            error.details || undefined
        );
    }
};

async function  login(req,res) {
        try {
        const { email, password } = req.body;
        const token = await service.login(email, password);
        return successResponse(res, token, "Login successful", StatusCodes.OK);
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            error.name || "LoginError",
            error.details || undefined
        );
    }
}

export default {
    signUp,
    login
}
