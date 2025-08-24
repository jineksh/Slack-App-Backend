import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        body: { type: String, required: true },
        image: { type: String, default: null }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    attachments: [{
        type: String
    }]
});

const Message = mongoose.model('Message', messageSchema);

export default Message;