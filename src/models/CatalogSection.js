const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    diameter: String,
    color: String,
    hex: String,
    label: String,
    lengths: [String],
    boxImage: String,
    implantImage: String,
});

const catalogSectionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        de: { type: String, required: [true, 'Please add a German name'] },
        en: { type: String, required: [true, 'Please add an English name'] }
    },
    title: {
        de: String,
        en: String
    },
    description: {
        de: String,
        en: String
    },
    subDescription: {
        de: String,
        en: String
    },
    benefitBar: {
        de: String,
        en: String
    },
    applicationArea: {
        de: String,
        en: String
    },
    type: {
        type: String,
        enum: ['product', 'info'],
        default: 'product'
    },
    variants: [variantSchema],
    images: {
        hero: String,
    },
    articles: [{
        artNr: String,
        description: {
            de: String,
            en: String
        },
        image: String,
        category: {
            de: String,
            en: String
        }
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('CatalogSection', catalogSectionSchema);
