import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from 'uuid';

import AppError from '../erros/AppError.js';
import channelRepo from "../repository/channel.js";
import workSpaceRepo from "../repository/workspace.js";
import CrudService from './crudService.js';

class WorkSpaceService extends CrudService {
    constructor() {
        super(workSpaceRepo)
        this.repository = new workSpaceRepo();
        this.channelRepo = new channelRepo();
    }

    async createWorkspace(data) {
        try {
            const uuid = uuidv4().replace(/-/g, ''); // remove dashes
            const joincode = uuid.slice(0, 6).toUpperCase(); // e.g. "F47AC1"

            const workspace = await this.repository.create({
                name: data.name,
                description: data.description,
                owner: data.userId,
                joincode,
                members: [data.userId]
            });

            const updatedWorkspace = await this.repository.addChannel(workspace._id, 'general');
            return updatedWorkspace;
        } catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(
                    error.message,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'CreateWorkspaceError',
                    error
                );
        }
    }

    async deleteWorkSpace(workspaceId, userId) {
        try {
            const workspace = await this.repository.get(workspaceId);

            if (!workspace) {
                throw new AppError("Workspace not found", 404);
            }

            if (workspace.owner.toString() !== userId.toString()) {
                throw new AppError("Unauthorized: You are not the owner of this workspace", 403);
            }

            await this.channelRepo.deleteMany(workspace.channels);
            const response = await this.repository.delete(workspaceId);
            return response;

        } catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Failed to delete workspace", 500, "WorkspaceDeletionError", error);
        }
    }

    async getWorkSpacebyId(workspaceId, userId) {
        try {
            const workspace = await this.repository.get(workspaceId);

            const validUser = workspace.members.some((member) => member._id == userId);

            console.log(validUser);

            if (!validUser) {
                throw new AppError("Unauthorized: You are not a member of this workspace", 403);
            }
            return workspace;

        }
        catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Failed to get workspace", 500, "WorkspaceNotFoundError", error);
        }
    }

    async getWorkSpaceByJoinCode(joincode) {
        try {
            const workspace = await this.repository.getWorkSpacebyJoinCode(joincode);
            return workspace;
        } catch (error) {
            console.log(error);
            throw new AppError("Failed to get workspace", 500, "WorkspaceNotFoundError", error);
        }
    }

    async updateWorkSpace(workspaceid, workspacedata, userId) {
        try {
            const workspace = await this.repository.get(workspaceid);

            if (!workspace) {
                throw new AppError("Workspace not found", 404, "WorkspaceNotFoundError");
            }

            if (workspace.owner != userId) {
                throw new AppError("Unauthorized: You are not the owner of this workspace", 403);
            }

            const updatedWorkspace = await this.repository.update(workspaceid, workspacedata);
            return updatedWorkspace;

        }
        catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Failed to update workspace", 500, "WorkspaceUpdateError", error);
        }
    }

    async addChannel(workspaceid, channelname, userid) {
        try {
            const workspace = await this.repository.get(workspaceid);

            if (!workspace) {
                throw new AppError("Workspace not found", 404, "WorkspaceNotFoundError");
            }

            if (workspace.owner != userid) {
                throw new AppError("Unauthorized: You are not the owner of this workspace", 403);
            }

            const updatedWorkspace = await this.repository.addChannel(workspaceid, channelname);

            return updatedWorkspace
        }
        catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Failed to add channel", 500, "ChannelAddError", error);
        }
    }

    async addMember(workspaceid, userid, memberId) {
        try {
            const workspace = await this.repository.get(workspaceid);

            if (!workspace) {
                throw new AppError("Workspace not found", 404, "WorkspaceNotFoundError");
            }

            if (workspace.owner != userid) {
                throw new AppError("Unauthorized: You are not the owner of this workspace", 403);
            }

            const updatedWorkspace = await this.repository.addMemberToWorkSpace(workspaceid, memberId);

            return updatedWorkspace;


        }
        catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Failed to add member", 500, "MemberAddError", error);
        }
    }

    async getAllWorkspacesByUserId(userId) {
        try {
            const workspaces = await this.repository.getAllWorkSpaceByMember(userId);
            return workspaces;
        } catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Failed to get workspaces", 500, "GetWorkspacesByUserIdError", error);
        }
    }

}
export default WorkSpaceService;