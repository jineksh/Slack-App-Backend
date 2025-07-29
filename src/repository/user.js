import AppError from "../erros/AppError";
import User from '../models/user';
import CrudRepo  from "./crudRepository";

class userRepo extends CrudRepo {


    constructor(){
        super(User);
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

}

export default userRepo;