import AppError from "../erros/AppError.js";
import Channel from "../models/channel.js";
import CrudRepo from "./crudRepository.js";

class channelRepo extends CrudRepo {
    constructor() {
        super(Channel);
    }

    async deleteMany(channelIds) {
        try {
            const response = await Channel.deleteMany({ _id: { $in: channelIds } });
            return response;
        } catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                throw error; // rethrow if already AppError
            }
            throw new AppError("Failed to delete channels", 500, "ChannelDeletionError", error);
        }
    }
}

export default channelRepo;