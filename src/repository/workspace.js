import { StatusCodes } from "http-status-codes";

import AppError from "../erros/AppError.js";
import User from "../models/user.js";
import Workspace from "../models/workspace.js";
import channelRepo from "./channel.js";
import CrudRepo from "./crudRepository.js";

class workSpaceRepo extends CrudRepo {

    constructor() {
        super(Workspace);
        this.channelRepo = new channelRepo();
    }

    async getWorkSpacebyJoinCode(joincode) {
        try {
            const workspace = await Workspace.findOne({ joincode: joincode });

            if (!workspace) {
                throw new AppError('Workspace not found', StatusCodes.NOT_FOUND, 'NotFound');
            }

            return workspace;
        }
        catch (error) {
            console.log(error);
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'GetWorkspaceByJoinCodeError', error);
        }
    }

    async addMemberToWorkSpace(workspaceid, userId) {
        try {
            const workspace = await Workspace.findById(workspaceid);
            if (!workspace) {
                throw new AppError('Workspace not found', StatusCodes.NOT_FOUND, 'NotFound');
            }

            const isValidUser = await User.findById(userId);

            if (!isValidUser) {
                throw new AppError('Invalid user', StatusCodes.BAD_REQUEST, 'InvalidUser');
            }

            const isUserAlready = workspace.members.some((member) => member._id == userId);

            if (isUserAlready) {
                throw new AppError('User already a member of workspace', StatusCodes.CONFLICT, 'AlreadyMember');
            }

            workspace.members.push(userId);
            await workspace.save();
            return workspace;

        } catch (error) {
            console.log(error);
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'AddMemberToWorkspaceError', error);
        }
    }

    async getWorkSpaceByName(name) {
        try {
            const workspace = await Workspace.findOne({ name: name });

            if (!workspace) {
                throw new AppError('Workspace not found', StatusCodes.NOT_FOUND, 'NotFound');
            }
            return workspace;

        } catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(
                    error.message,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'FindWorkspaceByNameError',
                    error
                );
        }
    }

    async addChannel(workspaceId, name) {
        try {
            const workspace = await Workspace.findById(workspaceId).populate('channels');

            if (!workspace) {
                throw new AppError('Workspace not found', StatusCodes.NOT_FOUND, 'NotFound');
            }

            const isPresent = workspace.channels.find((channel) => channel.name == name);

            if (isPresent) {
                throw new AppError('Channel is already present', StatusCodes.FORBIDDEN, 'ChannelAlreadyExists');
            }

            const repository = new channelRepo();
            const channel = await repository.create({ name });

            workspace.channels.push(channel._id);
            await workspace.save();

            return workspace;


        }

        catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(
                    error.message,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'AddChannelError',
                    error
                );
        }
    }

    async getAllWorkSpaceByMember(memberId) {
        try {
            const workspaces = await Workspace.find({ members: memberId });

            return workspaces;

        } catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(
                    error.message,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'FetchUserWorkspacesError',
                    error
                );
        }

    }

    async getWorkspaceByDetails(id) {
        try {
            console.log(id);
            const workspace = await Workspace.findById(id).
            populate('members', 'name email avatar').populate('channels', 'id name');

            if (!workspace) {
                throw new AppError("Workspace not found", StatusCodes.NOT_FOUND, "NotFound");
            }

            return workspace;
        } catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(
                    error.message,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'GetWorkspaceByDetailsError',
                    error
                );
        }

    }

}

export default workSpaceRepo;