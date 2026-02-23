const express = require('express');
const {
    getSections,
    getSection,
    createSection,
    updateSection,
    deleteSection
} = require('../controllers/catalogSectionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getSections)
    .post(protect, createSection);

router
    .route('/:id')
    .get(getSection)
    .put(protect, updateSection)
    .delete(protect, deleteSection);

module.exports = router;
