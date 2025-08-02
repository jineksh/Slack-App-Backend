import { StatusCodes } from "http-status-codes";

import WorkSpaceService from "../service/workspace.js";
import { errorResponse, successResponse } from '../utils/apiResponse.js';

const service = new WorkSpaceService();

const createWorkspace = async (req, res) => {
    try {
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

const DeleteWorkspace = async (req, res) => {
    try {
        const workspace = await service.deleteWorkSpace(req.params.workspaceid, req.user.id);
        return successResponse(
            res,
            workspace,
            'Workspace deleted successfully',
            StatusCodes.OK,
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

const getWorkSpacebyId = async (req, res) => {
    try {
        const workspace = await service.getWorkSpacebyId(req.params.workspaceid, req.user.id);
        if (!workspace) {
            return errorResponse(
                res,
                'Workspace not found',
                StatusCodes.NOT_FOUND,
            );
        }
        return successResponse(
            res,
            workspace,
            'Workspace found',
            StatusCodes.OK,
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
}

const getWorkSpacebyJoinCode = async (req, res) => {
    try {
        const workspace = await service.getWorkSpaceByJoinCode(req.params.joincode)
        if (!workspace) {
            return errorResponse(
                res,
                'Workspace not found',
                StatusCodes.NOT_FOUND,
            );
        }

        return successResponse(
            res,
            workspace,
            'Workspace found',
            StatusCodes.OK,
        )
    }
    catch (error) {
        console.log(error);
        return errorResponse(
            res,
            error?.message || 'Something went wrong',
            error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            error?.name || null,
            error?.explanation || null
        )
    }
}

const updateWorkSpace = async (req, res) => {
    try {
        const workspace = await service.updateWorkSpace(req.params.workspaceid, req.body, req.user.id);
        if (!workspace) {
            return errorResponse(
                res,
                'Workspace not found',
                StatusCodes.NOT_FOUND,
            );
        }
        return successResponse(
            res,
            workspace,
            'Workspace updated',
            StatusCodes.OK,
        )
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

}

const addChannel = async (req, res) => {
    try {
        const workspace = await service.addChannel(req.params.workspaceid, req.body.name, req.user.id);
        if (!workspace) {
            return errorResponse(
                res,
                'Workspace not found',
                StatusCodes.NOT_FOUND,

            )
        }
        return successResponse(
            res,
            workspace,
            'Channel added',
            StatusCodes.OK,
        )
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
}

const addMember = async (req, res) => {
    try {
        const workspace = await service.addMember(req.params.workspaceid, req.user.id, req.body.id);
        if (!workspace) {
            return errorResponse(
                res,
                'Workspace not found',
                StatusCodes.NOT_FOUND,

            )

        }
        return successResponse(
            res,
            workspace,
            'Member added',
            StatusCodes.OK,
        )
    }
    catch (error) {
        console.log(error);
        return errorResponse(
            res,
            error?.message || 'Something went wrong',
            error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            error?.name || null,
            error?.explanation || null
        )
    }
}


export default {
    createWorkspace,
    DeleteWorkspace,
    getWorkSpacebyId,
    getWorkSpacebyJoinCode,
    updateWorkSpace,
    addChannel,
    addMember
};
