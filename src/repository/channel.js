import Channel from "../models/channel.js";
import CrudRepo from "./crudRepository.js";

class channelRepo extends CrudRepo{
    constructor(){
        super(Channel);
    }
}

export default channelRepo;