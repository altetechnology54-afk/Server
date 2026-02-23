const mongoose = require('mongoose');

const staticPageSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        unique: true
    }, // 'about', 'contact', 'impressum', 'datenschutz', 'agb'
    title: {
        de: { type: String },
        en: { type: String }
    },
    subtitle: {
        de: { type: String },
        en: { type: String }
    },
    content: {
        de: { type: String },
        en: { type: String }
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('StaticPage', staticPageSchema);
