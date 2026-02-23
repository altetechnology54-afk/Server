const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const HomeContent = require('./models/HomeContent');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const checkHome = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const contents = await HomeContent.find();
        console.log('--- Home Content Documents ---');
        console.log(JSON.stringify(contents, null, 2));
        console.log('------------------------------');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkHome();
