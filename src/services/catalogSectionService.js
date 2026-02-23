const CatalogSection = require('../models/CatalogSection');

class CatalogSectionService {
    async getAllSections() {
        return await CatalogSection.find();
    }

    async getSectionById(id) {
        return await CatalogSection.findOne({ id });
    }

    async createSection(sectionData) {
        return await CatalogSection.create(sectionData);
    }

    async updateSection(id, sectionData) {
        return await CatalogSection.findOneAndUpdate({ id }, sectionData, {
            new: true,
            runValidators: true,
        });
    }

    async deleteSection(id) {
        return await CatalogSection.findOneAndDelete({ id });
    }
}

module.exports = new CatalogSectionService();
