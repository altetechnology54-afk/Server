const catalogSectionService = require('../services/catalogSectionService');

// @desc    Get all catalog sections
// @route   GET /api/catalog-sections
// @access  Public
exports.getSections = async (req, res, next) => {
    try {
        const sections = await catalogSectionService.getAllSections();
        res.status(200).json({ success: true, count: sections.length, data: sections });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get single catalog section by ID (slug)
// @route   GET /api/catalog-sections/:id
// @access  Public
exports.getSection = async (req, res, next) => {
    try {
        const section = await catalogSectionService.getSectionById(req.params.id);
        if (!section) {
            return res.status(404).json({ success: false, error: 'Catalog section not found' });
        }
        res.status(200).json({ success: true, data: section });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create new catalog section
// @route   POST /api/catalog-sections
// @access  Private
exports.createSection = async (req, res, next) => {
    try {
        const section = await catalogSectionService.createSection(req.body);
        res.status(201).json({ success: true, data: section });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update catalog section
// @route   PUT /api/catalog-sections/:id
// @access  Private
exports.updateSection = async (req, res, next) => {
    try {
        const section = await catalogSectionService.updateSection(req.params.id, req.body);
        if (!section) {
            return res.status(404).json({ success: false, error: 'Catalog section not found' });
        }
        res.status(200).json({ success: true, data: section });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete catalog section
// @route   DELETE /api/catalog-sections/:id
// @access  Private
exports.deleteSection = async (req, res, next) => {
    try {
        const section = await catalogSectionService.deleteSection(req.params.id);
        if (!section) {
            return res.status(404).json({ success: false, error: 'Catalog section not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
