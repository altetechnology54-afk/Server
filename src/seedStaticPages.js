const mongoose = require('mongoose');
const dotenv = require('dotenv');
const StaticPage = require('./models/StaticPage');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const initialPagesData = [
    {
        page: 'about',
        title: { de: 'Über AL-Technology', en: 'About AL-Technology' },
        subtitle: { de: 'Premium Zahnimplantatsysteme seit 2001.', en: 'Premium Dental Implant Systems since 2001.' },
        content: {
            de: 'Unsere Mission ist es, Zahnärzten und Chirurgen weltweit hochpräzise, zuverlässige und ästhetisch ansprechende Implantatlösungen anzubieten.',
            en: 'Our mission is to provide dentists and surgeons worldwide with high-precision, reliable, and aesthetically pleasing implant solutions.'
        },
        data: {
            historyTitle: { de: 'Unsere Geschichte', en: 'Our History' },
            historyContent: {
                de: 'AL-Technology wurde mit dem Ziel gegründet, die Qualität der dentalen Implantologie durch Innovation und technische Exzellenz zu verbessern.',
                en: 'AL-Technology was founded with the aim of improving the quality of dental implantology through innovation and technical excellence.'
            }
        }
    },
    {
        page: 'contact',
        title: { de: 'Kontaktieren Sie uns', en: 'Contact Us' },
        subtitle: { de: 'Wir sind für Sie da. Haben Sie Fragen?', en: 'We are here for you. Have questions?' },
        data: {
            email: 'info@at-implantate.de',
            phone: '+49 (0) 30 1234567',
            address: 'Musterstraße 123, 12345 Berlin, Germany'
        }
    },
    {
        page: 'impressum',
        title: { de: 'Impressum', en: 'Legal Notice' },
        content: { de: 'Verantwortlich für den Inhalt nach § 5 TMG...', en: 'Responsible for content according to § 5 TMG...' }
    },
    {
        page: 'datenschutz',
        title: { de: 'Datenschutz', en: 'Privacy Policy' },
        content: { de: 'Informationen zum Schutz Ihrer persönlichen Daten...', en: 'Information on the protection of your personal data...' }
    },
    {
        page: 'agb',
        title: { de: 'AGB', en: 'Terms & Conditions' },
        content: { de: 'Allgemeine Geschäftsbedingungen...', en: 'General Terms and Conditions...' }
    }
];

const seedStaticPages = async () => {
    try {
        await StaticPage.deleteMany({});
        console.log('Cleared existing static pages.');

        for (const data of initialPagesData) {
            await StaticPage.create(data);
            console.log(`Seeded page: ${data.page}`);
        }

        console.log('Static pages seeding completed!');
        process.exit();
    } catch (err) {
        console.error('Error seeding static pages:', err);
        process.exit(1);
    }
};

seedStaticPages();
