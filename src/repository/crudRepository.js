import { StatusCodes } from 'http-status-codes';

import AppError from '../erros/AppError.js';

class CrudRepo {

    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            console.log(data);
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log(error);
            throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'CreateError', error);
        }
    }

    async delete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            if (!result) {
                throw new AppError('Resource not found', StatusCodes.NOT_FOUND, 'NotFound');
            }
            return result;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError ? error : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'DeleteError', error);
        }
    }

    async update(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            if (!result) {
                throw new AppError('Resource not found', StatusCodes.NOT_FOUND, 'NotFound');
            }
            return result;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError ? error : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'UpdateError', error);
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            if (!result) {
                throw new AppError('Resource not found', StatusCodes.NOT_FOUND, 'NotFound');
            }
            return result;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError ? error : new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, 'GetError', error);
        }
    }
}

export default CrudRepo