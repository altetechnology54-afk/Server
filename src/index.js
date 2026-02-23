const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const catalogSectionRoutes = require('./routes/catalogSectionRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const homeRoutes = require('./routes/homeRoutes');

let server;

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/catalog-sections', catalogSectionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/home', homeRoutes);

const errorHandler = require('./middleware/error');
app.use(errorHandler);

// Simple health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    server = app.listen(
        PORT,
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    if (server) {
        server.close(() => process.exit(1));
    } else {
        process.exit(1);
    }
});

module.exports = app;
