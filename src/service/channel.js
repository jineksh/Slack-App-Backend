
import channelRepo from "../repository/channel.js";
import CrudService from "./crudService.js";
class ChannelService extends CrudService{

    constructor(){
        super(channelRepo);
    }


}

export default ChannelService;