import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from 'uuid';

import AppError from '../erros/AppError.js';
import workSpaceRepo from "../repository/workspace.js";
import CrudService from './crudService.js';

class WorkSpaceService extends CrudService {
    constructor() {
        super(workSpaceRepo)
        this.repository = new workSpaceRepo();
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
}

export default WorkSpaceService;