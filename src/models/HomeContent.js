const mongoose = require('mongoose');

const homeContentSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true,
        unique: true
    }, // e.g., 'hero-slider', 'features-1', 'about-main'
    type: {
        type: String,
        required: true,
        enum: ['hero-slider', 'features', 'stats', 'about'],
        default: 'hero-slider'
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // Flexible data container based on the 'type'
    data: {
        slides: [{
            image: String,
            title: { de: String, en: String },
            subtitle: { de: String, en: String },
            link: String,
            order: Number
        }],
        features: [{
            icon: String, // lucide icon name
            title: { de: String, en: String },
            content: { de: String, en: String }
        }],
        stats: [{
            number: String,
            label: { de: String, en: String }
        }],
        about: {
            title: { de: String, en: String },
            content: { de: String, en: String },
            image: String,
            link: String
        }
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('HomeContent', homeContentSchema);
