const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: {
        de: String,
        en: String
    },
    subtitle: {
        de: String,
        en: String
    },
    link: String,
    order: { type: Number, default: 0 }
});

const homeContentSchema = new mongoose.Schema({
    section: { type: String, required: true, unique: true }, // e.g., 'hero-slider'
    slides: [slideSchema],
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true,
});

module.exports = mongoose.model('HomeContent', homeContentSchema);
