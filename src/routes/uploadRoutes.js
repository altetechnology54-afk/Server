const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Configure Multer for temporary storage
const os = require('os');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, os.tmpdir());
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype) || (file.mimetype === 'application/pdf');

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images or PDFs only!');
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB max file size
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Create uploads directory if it doesn't exist (only in local environments)
if (!process.env.VERCEL) {
    const fs = require('fs');
    if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
    }
}

router.post('/', protect, upload.single('image'), uploadImage);

module.exports = router;
