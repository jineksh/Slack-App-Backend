import userRepo from "../repository/user";
import CrudService from "./crudService";


class userService extends CrudService {

    constructor(){
        super(userRepo);
    }

}

export default userService;