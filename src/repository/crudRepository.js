import AppError from '../erros/AppError.js'

class CrudRepo {

    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log(error);
            throw new AppError(error.message, 500, 'CreateError', error);
        }
    }

    async delete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            if (!result) {
                throw new AppError('Resource not found', 404, 'NotFound');
            }
            return result;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError ? error : new AppError(error.message, 500, 'DeleteError', error);
        }
    }

    async update(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            if (!result) {
                throw new AppError('Resource not found', 404, 'NotFound');
            }
            return result;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError ? error : new AppError(error.message, 500, 'UpdateError', error);
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            if (!result) {
                throw new AppError('Resource not found', 404, 'NotFound');
            }
            return result;
        } catch (error) {
            console.log(error);
            throw error instanceof AppError ? error : new AppError(error.message, 500, 'GetError', error);
        }
    }
}

export default CrudRepo;