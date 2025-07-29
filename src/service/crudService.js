import { StatusCodes } from "http-status-codes";

import AppError from "../erros/AppError.js";

class CrudService {

    constructor(repo) {
        this.repository = new repo();
    }

    async create(data) {
        try {
            const result = await this.repository.create(data);
            return result;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'CreateServiceError', error);
        }
    }

    async delete(id) {
        try {
            const result = await this.repository.delete(id);
            return result;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'DeleteServiceError', error);
        }
    }

    async update(id, data) {
        try {
            const result = await this.repository.update(id, data);
            return result;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'UpdateServiceError', error);
        }
    }

    async get(id) {
        try {
            const result = await this.repository.get(id);
            return result;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError
                ? error
                : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'GetServiceError', error);
        }
    }
}
export default CrudService