import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT : process.env.PORT || 3001,
    DEV_DB_URL : process.env.DEV_DB_URL

}