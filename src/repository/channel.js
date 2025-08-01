import Channel from "../models/channel";
import CrudRepo from "./crudRepository";

class channelRepo extends CrudRepo{
    constructor(){
        super(Channel);
    }
}

export default channelRepo;