import AppError from "../erros/AppError.js";
import User from '../models/user.js';
import CrudRepo  from "./crudRepository.js";

class userRepo extends CrudRepo {


    constructor(){
        super(User);
    }
    async singUp(data){
        try{
            const user = new User(data);
            await user.save();
            return user;
        }
        catch(error){
            console.log(error);
            throw error instanceof AppError ? error : new AppError(error.message, 500, 'SingUpError', error);
        }
    }

    async getByName(name){
        try {
            const user = await User.findOne({name : name});
            if (!user) {
                throw new AppError('User not found', 404, 'NotFound');
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError ? error : new AppError(error.message, 500, 'GetByNameError', error);
        }
    }

    async getByEmail(email){
        try {
            const user = await User.findOne({email : email});
            if (!user) {
                throw new AppError('User not found', 404, 'NotFound');
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError ? error : new AppError(error.message, 500, 'GetByNameError', error);
        }
    }

    async getByCode(varificationCode){
        try {
            const user = await User.findOne({varificationCode : varificationCode});
            if (!user) {
                throw new AppError('User not found', 404, 'NotFound');
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError ? error : new AppError(error.message, 500, 'GetByCodeError', error);
        }
    }

}

export default userRepo;