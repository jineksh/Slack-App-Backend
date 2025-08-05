import { StatusCodes } from "http-status-codes";

import messageService from "../service/message.js";
import { errorResponse,successResponse } from '../utils/apiResponse.js';

const service = new messageService();

const getPaginatedMessages = async (req,res) => {
    try {
        const message = await service.getPaginatedMessages({
            channel : req.params.channelId
        },
        req.body.page,
        req.body.limit);

        return successResponse(
            res,
            message,
            'messages found',
            StatusCodes.OK
        );

    } catch (error) {
        console.log(error);
        return errorResponse(
            res,
            error?.message || 'Something went wrong',
            error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            error?.name || null,
            error?.explanation || null
        )
    }
};


export default {
    getPaginatedMessages
}