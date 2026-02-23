const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        if (error.message.includes('timeout') || error.message.includes('ECONNREFUSED')) {
            console.error('\n⚠️  CONNECTION FAILED: This is likely due to IP Whitelisting in MongoDB Atlas.');
            console.error('Please ensure you have whitelisted 0.0.0.0/0 or your current machine IP in the Atlas Network Access panel.\n');
        }
        process.exit(1);
    }
};

module.exports = connectDB;
