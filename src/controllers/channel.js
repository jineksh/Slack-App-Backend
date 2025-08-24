
import { StatusCodes } from "http-status-codes";

import ChannelService from "../service/channel.js";
import { errorResponse,successResponse } from '../utils/apiResponse.js';
const service = new ChannelService();

const getChannel = async(req,res)=>{
    try {
        const channel = await service.get(req.params.channelId);
        return successResponse(res,channel,'Channel Fetched',StatusCodes.OK);
    } catch (error) {
        return errorResponse(res,error,'Something went Wrong',StatusCodes.BAD_REQUEST);
    }
}

export default {
    getChannel
}