import { StatusCodes } from "http-status-codes";

import WorkSpaceService from "../service/workspace.js";
import { errorResponse, successResponse } from '../utils/apiResponse.js';

const service = new WorkSpaceService();

const createWorkspace = async (req, res) => {
    try {
        console.log(req.user);
        const workspace = await service.createWorkspace({
            name: req.body.name,
            description: req.body.description,
            userId: req.user.id
        });

        return successResponse(
            res,
            workspace,
            'Workspace created successfully',
            StatusCodes.CREATED,
            
        );

    } catch (error) {
        console.log(error);
        return errorResponse(
            res,
            error?.message || 'Something went wrong',
            error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            error?.name || null,
            error?.explanation || null
        );
    }
};

export default {
    createWorkspace
};
