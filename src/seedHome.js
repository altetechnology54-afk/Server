const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const HomeContent = require('./models/HomeContent');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const initialHomeData = [
    {
        section: 'hero-slider',
        type: 'hero-slider',
        isActive: true,
        order: 1,
        data: {
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
    },
    {
        section: 'home-features',
        type: 'features',
        isActive: true,
        order: 2,
        data: {
            features: [
                {
                    icon: 'Zap',
                    title: { de: 'Präzision', en: 'Precision' },
                    content: { de: 'Höchste Genauigkeit in jedem Detail.', en: 'Highest accuracy in every detail.' }
                },
                {
                    icon: 'Shield',
                    title: { de: 'Sicherheit', en: 'Safety' },
                    content: { de: 'Geprüfte Qualität für Ihre Patienten.', en: 'Tested quality for your patients.' }
                },
                {
                    icon: 'Award',
                    title: { de: 'Exzellenz', en: 'Excellence' },
                    content: { de: 'Jahrzehntelange Erfahrung im Bereich.', en: 'Decades of experience in the field.' }
                }
            ]
        }
    },
    {
        section: 'home-stats',
        type: 'stats',
        isActive: true,
        order: 3,
        data: {
            stats: [
                { number: '15k+', label: { de: 'Patienten', en: 'Patients' } },
                { number: '250+', label: { de: 'Partner', en: 'Partners' } },
                { number: '99%', label: { de: 'Erfolgsrate', en: 'Success Rate' } }
            ]
        }
    }
];

const seedHome = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');

        // Clear existing home content to avoid type conflicts during refactor
        await HomeContent.deleteMany({});
        console.log('Cleared existing home content.');

        for (const content of initialHomeData) {
            await HomeContent.create(content);
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
