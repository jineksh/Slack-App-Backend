import mongoose from 'mongoose';


const channelSchema = new mongoose.Schema({

    name : {
        type : String,
        require : true
    },

}, {timestamps : true});



const Channel = mongoose.model('Channel',channelSchema);

export default Channel;