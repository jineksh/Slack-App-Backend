import mongoose from "mongoose";

import config  from "./server.js";

async function connectDb(){
    await mongoose.connect(config.DEV_DB_URL);
    console.log('Connected to Mongodb');
}

export default connectDb;