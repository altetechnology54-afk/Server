const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CatalogSection = require('./models/CatalogSection');

dotenv.config();

const infoSections = [
    {
        id: 'anweisung',
        type: 'info',
        name: {
            de: 'Anweisung',
            en: 'Instructions'
        },
        title: {
            de: 'Anweisung für die Verwendung für AL-Technology Implantate',
            en: 'Instructions for use for AL-Technology dental implants'
        },
        description: {
            de: 'Warnung: AL-Technology Produkte sind nur durch zertifizierte Zahnärzte einzusetzen',
            en: 'Warning: Al-Technology implants are products to be used only by certified dentists.'
        },
        subDescription: {
            de: 'Chirurgische Planung und Verfahren',
            en: 'Surgical planning and procedures'
        },
        applicationArea: {
            de: 'Alle Implantate sind in doppelten Phiolen in einer speziellen sterilen Umgebung verpackt worden...',
            en: 'All implants are cleaned and packaged in double vials in special clean environment...'
        },
        benefitBar: {
            de: 'SICHERHEIT - PRÄZISION - STERILITÄT',
            en: 'SAFETY - PRECISION - STERILITY'
        },
        variants: []
    },
    {
        id: 'farbleitsystem',
        type: 'info',
        name: {
            de: 'Farbleitsystem',
            en: 'Color Guide System'
        },
        title: {
            de: '1. Implantate Farbleitsystem',
            en: '1. Implants Color guide system'
        },
        description: {
            de: 'Farbcodierung für verschiedene Implantat-Durchmesser',
            en: 'Color coding for different implant diameters'
        },
        subDescription: {
            de: '2. Farbcodierung Bohrer',
            en: '2. Color Code Drills'
        },
        benefitBar: {
            de: 'GELB - ROT - BLAU - GRÜN - WEISS',
            en: 'YELLOW - RED - BLUE - GREEN - WHITE'
        },
        applicationArea: {
            de: 'Außengekühlter chirurgischer Stahl...',
            en: 'High-precision surgical steel...'
        },
        variants: [
            { diameter: '3,30', hex: '#FFEB3B', lengths: [] },
            { diameter: '3,75', hex: '#F44336', lengths: [] },
            { diameter: '4,20', hex: '#03A9F4', lengths: [] },
            { diameter: '5,00', hex: '#4CAF50', lengths: [] },
            { diameter: '6,00', hex: '#FFFFFF', lengths: [] }
        ]
    },
    {
        id: 'bohrsystem',
        type: 'info',
        name: {
            de: 'Intelligentes Bohrsystem',
            en: 'Intelligent Drilling System'
        },
        title: {
            de: 'Bohrsystem / Das Intelligenteste Bohrsystem der Welt',
            en: 'Drilling System / The Intelligent drilling system in the World'
        },
        description: {
            de: 'Schluss mit Bohrerstopper und Bohrhülsen. Nehmen Sie einfach den Bohrer, der zu der Implantatlänge passt!',
            en: 'No more drill stopper and drill cores. Just take the drill that fits the implant length!'
        },
        subDescription: {
            de: 'Das AL-Techno-System bietet ein sicheres und einfaches Bohrverfahren durch die drei Bohrerlängen 10 mm, 11,5 mm und 13 mm passend zu den Implantatlängen.',
            en: 'The A -Techno system offers a safe and easy drilling by the three drill length 10 mm, 11.5 mm and 13 mm to match the implant length.'
        },
        applicationArea: {
            de: 'Sie nehmen die passende Bohrerlänge und bohren bis zum Anschlag, einfacher und sicherer geht es nicht.',
            en: 'Take the Matching drill length and drill to the stop, easier and safer it gets.'
        },
        benefitBar: {
            de: 'EINFACHHEIT - PRÄZISION - SICHERHEIT',
            en: 'SIMPLICITY - PRECISION - SAFETY'
        },
        variants: [
            { diameter: '2,0mm', color: 'Grau', hex: '#9E9E9E', lengths: ['10mm', '11,5mm', '13mm'] },
            { diameter: '2,8mm', color: 'Gelb', hex: '#FFEB3B', lengths: ['10mm', '11,5mm', '13mm'] },
            { diameter: '3,2mm', color: 'Rot', hex: '#F44336', lengths: ['10mm', '11,5mm', '13mm'] },
            { diameter: '3,8mm', color: 'Blau', hex: '#2196F3', lengths: ['10mm', '11,5mm', '13mm'] },
            { diameter: '4,2mm', color: 'Grün', hex: '#4CAF50', lengths: ['10mm', '11,5mm', '13mm'] },
            { diameter: '5,2mm', color: 'Weiss', hex: '#FFFFFF', lengths: ['10mm', '11,5mm', '13mm'] }
        ],
        articles: [
            { artNr: 'Ros 1', description: { de: 'Rosenbohrer / Round Bar Drill ø 2,0 mm Länge/ Length 22 mm. 3 mm', en: 'Round Bar Drill ø 2,0 mm Length 22 mm. 3 mm' }, category: { de: 'Standard', en: 'Standard' } },
            { artNr: 'Cor 2', description: { de: 'Corticalis-Bohrer / Cortical Drill', en: 'Cortical Drill' }, category: { de: 'Standard', en: 'Standard' } },
            { artNr: 'Cer 3', description: { de: 'Keramikbohrer / Ceramic drills ø 2,0 mm außerordentlich scharf und unterliegen keinem Verschleiß', en: 'Ceramic drills ø 2,0 mm exceptionally sharp and subject to no wear' }, category: { de: 'Standard', en: 'Standard' } },
            { artNr: 'CON 32', description: { de: 'ø 3,2 mm / ø 2,6 mm Länge / Length 6 mm', en: 'ø 3.2 mm / ø 2.6 mm Length 6 mm' }, category: { de: 'konische Bohrer / Conical Drills', en: 'Conical Drills' } },
            { artNr: 'CON 38', description: { de: 'ø 3,8 mm / ø 3,0 mm Länge / Length 6 mm', en: 'ø 3.8 mm / ø 3.0 mm Length 6 mm' }, category: { de: 'konische Bohrer / Conical Drills', en: 'Conical Drills' } },
            { artNr: 'Cy2010', description: { de: 'ø 2,0mm Länge / Length 10 mm', en: 'ø 2.0mm Length 10 mm' }, category: { de: 'Zylindrische Bohrer / Cylindrical Drills', en: 'Cylindrical Drills' } }
        ]
    },
    {
        id: 'chirurgie-op-tray',
        type: 'info',
        name: {
            de: 'Chirurgie - OP-Tray',
            en: 'Surgery - OP-Tray'
        },
        title: {
            de: 'Chirurgie - OP-Tray',
            en: 'Surgery - OP-Tray'
        },
        description: {
            de: 'Katalog für Chirurgie-Instrumente und OP-Tray Komponenten.',
            en: 'Catalog for surgical instruments and OP-Tray components.'
        },
        subDescription: {
            de: 'Vollständiges Set für chirurgische Eingriffe.',
            en: 'Complete set for surgical procedures.'
        },
        applicationArea: {
            de: 'Chirurgie',
            en: 'Surgery'
        },
        benefitBar: {
            de: 'PRÄZISION - EFFIZIENZ - VOLLSTÄNDIGKEIT',
            en: 'PRECISION - EFFICIENCY - COMPLETENESS'
        },
        variants: [],
        articles: [
            { artNr: 'OPTL', description: { de: 'Op-Tray Leer inkl. Platte / empty Surgical Kit', en: 'Empty Op-Tray incl. plate' }, category: { de: 'Tray', en: 'Tray' } },
            { artNr: 'OPTK', description: { de: 'Op-Tray komplett / Surgical Kit completely', en: 'Complete Op-Tray' }, category: { de: 'Tray', en: 'Tray' } },
            { artNr: 'ISM', description: { de: 'Implantschlüssel maschinell / Motor Implant Driver', en: 'Motor Implant Driver' }, category: { de: 'Instrumente', en: 'Instruments' } },
            { artNr: 'IMS', description: { de: 'Implantatschlüssel lang / 18mm / Implant Driver Hex long', en: 'Implant Driver Hex long' }, category: { de: 'Instrumente', en: 'Instruments' } },
            { artNr: 'SRS', description: { de: 'Einbringschlüssel / Prothetic Driver 1,25mm', en: 'Prothetic Driver 1.25mm' }, category: { de: 'Instrumente', en: 'Instruments' } },
            { artNr: 'ROS1', description: { de: 'Rosenbohrer / Round Bar Drill ø 2,0 mm Länge / Length 22mm Oberflächenglättung des Kieferkamms', en: 'Round Bar Drill ø 2.0mm Length 22mm' }, category: { de: 'Bohrer', en: 'Drills' } },
            { artNr: 'GS', description: { de: 'Gingivastanze für Motor/ Punch ø 4,0 - Länge / Length 23mm', en: 'Gingiva Punch for Motor' }, category: { de: 'Instrumente', en: 'Instruments' } },
            { artNr: 'TS', description: { de: 'Tiefensonde/ Depth Measurments 8/10/11,5/13/16 ø 1,9mm/2,7mm', en: 'Depth Gauge 8/10/11.5/13/16' }, category: { de: 'Instrumente', en: 'Instruments' } },
            { artNr: 'DMR', description: { de: 'Drehmoment-Ratsche / Torque Rachet: Implant=30 N Abutment= 15-20 N', en: 'Torque Ratchet' }, category: { de: 'Instrumente', en: 'Instruments' } }
        ]
    }
];

const seedInfo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');

        for (const section of infoSections) {
            await CatalogSection.findOneAndUpdate(
                { id: section.id },
                section,
                { upsert: true, new: true }
            );
            console.log(`Seeded info section: ${section.id}`);
        }

        console.log('Seeding completed!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedInfo();
