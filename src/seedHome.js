const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const HomeContent = require('./models/HomeContent');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const initialHomeData = [
    {
        section: 'hero-slider',
        isActive: true,
        slides: [
            {
                image: 'https://images.unsplash.com/photo-1629482426626-d62cc7e2a96a?q=80&w=2070&auto=format&fit=crop',
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
                image: 'https://images.unsplash.com/photo-1606811841660-1b5168c5c2b8?q=80&w=1974&auto=format&fit=crop',
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
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }
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
