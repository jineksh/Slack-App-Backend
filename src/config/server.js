import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT : process.env.PORT || 3001,
    DEV_DB_URL : process.env.DEV_DB_URL,
    JWT_KEY : process.env.JWT_KEY,
    REDIS_PORT : process.env.REDIS_PORT,
    REDIS_HOST : process.env.REDIS_HOST

}