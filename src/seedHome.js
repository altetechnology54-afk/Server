const mongoose = require('mongoose');
const dotenv = require('dotenv');
const HomeContent = require('./models/HomeContent');

dotenv.config();

const initialHomeData = [
    {
        section: 'hero-slider',
        isActive: true,
        slides: [
            {
                image: '/Users/abdullahalhasan/.gemini/antigravity/brain/4538d933-8791-47f4-823c-32d65be397de/hero_slider_1_premium_1771866161765.png',
                title: {
                    de: 'AL-TECHNOLOGY IMPLANTATE',
                    en: 'AL-TECHNOLOGY IMPLANTS'
                },
                subtitle: {
                    de: 'Hochpräzise Zahnimplantatsysteme für professionelle Anwender.',
                    en: 'High-precision dental implant systems for professionals.'
                },
                link: '/de/catalog',
                order: 1
            },
            {
                image: '/Users/abdullahalhasan/.gemini/antigravity/brain/4538d933-8791-47f4-823c-32d65be397de/hero_slider_2_premium_1771866308554.png',
                title: {
                    de: 'QUALITÄT & PRÄZISION',
                    en: 'QUALITY & PRECISION'
                },
                subtitle: {
                    de: 'Entwickelt für Stabilität und Ästhetik.',
                    en: 'Designed for stability and aesthetics.'
                },
                link: '/de/catalog',
                order: 2
            }
        ]
    }
];

const seedHome = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');

        for (const content of initialHomeData) {
            await HomeContent.findOneAndUpdate(
                { section: content.section },
                content,
                { upsert: true, new: true }
            );
            console.log(`Seeded home section: ${content.section}`);
        }

        console.log('Home seeding completed!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedHome();
