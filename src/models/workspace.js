import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Workspace name is required'],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    joincode : {
        type : String,
    },
    channels : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Channel'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Workspace = mongoose.model('Workspace', workspaceSchema);
export default Workspace;