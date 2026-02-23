const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CatalogSection = require('./models/CatalogSection');
const User = require('./models/User');

dotenv.config();

const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../../at-implantate/src/data/products.json`, 'utf-8')
);

const defaultUser = {
    email: 'altetechnology54@gmail.com',
    password: 'Alteckonolgy#2722'
};

const importData = async () => {
    try {
        const sections = Object.keys(products).map(key => ({
            ...products[key],
            id: key
        }));

        await CatalogSection.create(sections);

        const userExists = await User.findOne({ email: defaultUser.email });
        if (!userExists) {
            await User.create(defaultUser);
            console.log('✅ Default User Seeded');
        }

        console.log('✅ Data Successfully Imported to MongoDB Atlas');
        process.exit();
    } catch (err) {
        console.error('❌ Import Failed:', err.message);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await CatalogSection.deleteMany();
        await User.deleteMany();
        console.log('🗑️ Data Destroyed');
        process.exit();
    } catch (err) {
        console.error('❌ Deletion Failed:', err.message);
        process.exit(1);
    }
};

const connectWithRetry = async () => {
    console.log('Connecting to MongoDB Atlas...');
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });
        console.log('📡 Connection Established');

        if (process.argv[2] === '-i') {
            await importData();
        } else if (process.argv[2] === '-d') {
            await deleteData();
        }
    } catch (err) {
        console.error('\n❌ DATABASE CONNECTION ERROR:', err.message);
        console.error('-------------------------------------------');
        console.error('CRITICAL: This is likely an IP Whitelist issue.');
        console.error('Please go to MongoDB Atlas -> Network Access');
        console.error('Add 0.0.0.0/0 to allow all connections for now.');
        console.error('-------------------------------------------\n');
        process.exit(1);
    }
};

connectWithRetry();
