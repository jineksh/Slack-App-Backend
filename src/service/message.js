import AppError from "../erros/AppError.js";
import messsageRepo from "../repository/message.js";
import CrudService from "./crudService.js";

class messageService extends CrudService {
    constructor() {
        super(messsageRepo);
        this.repository = new messsageRepo();
    }

    async getPaginatedMessages(params, page, limit) {

        try {
            const message = await this.repository.getPaginatedMessages(params, page, limit);
            return message;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError(
                'Failed to get messages',
                500,
                'MessageServiceError',
                error.message || error
            );
        }

    }
}

export default messageService;