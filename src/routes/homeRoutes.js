const express = require('express');
const router = express.Router();
const HomeContent = require('../models/HomeContent');

// @desc    Get home content by section
// @route   GET /api/home/:section
router.get('/:section', async (req, res) => {
    try {
        const content = await HomeContent.findOne({ section: req.params.section });
        if (!content) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Update or create home content
// @route   POST /api/home/:section
router.post('/:section', async (req, res) => {
    const { slides, isActive } = req.body;
    try {
        const content = await HomeContent.findOneAndUpdate(
            { section: req.params.section },
            { slides, isActive },
            { upsert: true, new: true }
        );
        res.json(content);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
