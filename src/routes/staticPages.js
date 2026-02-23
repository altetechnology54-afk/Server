const express = require('express');
const router = express.Router();
const StaticPage = require('../models/StaticPage');

// Get all static pages
router.get('/', async (req, res) => {
    try {
        const pages = await StaticPage.find({ isActive: true });
        res.json(pages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single static page by its slug
router.get('/:page', async (req, res) => {
    try {
        const page = await StaticPage.findOne({ page: req.params.page });
        if (!page) return res.status(404).json({ message: 'Page not found' });
        res.json(page);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update or create a static page
router.post('/:page', async (req, res) => {
    const { title, subtitle, content, data, isActive } = req.body;
    try {
        const page = await StaticPage.findOneAndUpdate(
            { page: req.params.page },
            { title, subtitle, content, data, isActive },
            { upsert: true, new: true }
        );
        res.json(page);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
