
import AppError from '../erros/AppError.js';
import Message from '../models/message.js';
import CrudRepo from "./crudRepository.js";

class messsageRepo extends CrudRepo {
    constructor() {
        super(Message);
    }


    async getPaginatedMessages(params, page, limit) {
        try {
            const messages = await Message.
                find(params).
                skip((page - 1) * limit).
                limit(limit).
                sort({ createdAt: 1 }).
                populate('sender', 'name email avatar');

            return messages;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError(
                'Failed to fetch messages',
                500,
                'MessageFetchError',
                error.message
            );
        }
    }

}


export default messsageRepo;