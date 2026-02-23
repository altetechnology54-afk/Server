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
        images: { hero: '' },
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
        images: { hero: '' },
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
        images: { hero: '' },
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
        images: { hero: '' },
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
    },
    {
        id: 'garantie-reparatur',
        type: 'info',
        name: {
            de: 'Garantie + Reparatur',
            en: 'Warranty + Repair'
        },
        title: {
            de: 'Garantie + Reparatur',
            en: 'Warranty + Repair'
        },
        description: {
            de: 'Bei allen Artikeln gilt selbstverständlich die gesetzliche Gewährleistungsfrist von 2 Jahren.\n\nDarüber hinaus gewährt der Hersteller arnica eine Herstellergarantie von 3 Jahren.',
            en: 'All items are of course subject to the statutory warranty period of 2 years.\n\nIn addition, the manufacturer arnica grants a manufacturer\'s warranty of 3 years.'
        },
        subDescription: {
            de: 'Und wenn mal was kaputtgeht?',
            en: 'And if something breaks?'
        },
        applicationArea: {
            de: '(Natürlich im Gewährleistung- oder Garantiefall kostenlos)\n\nBitte beachten Sie die die Garantiehinweise des Herstellers.\n\nUnsere Kundenberater helfen Ihnen gerne weiter.\nRufen Sie uns an oder schreiben Sie eine E-Mail! at-implantate@t-online.de\n\nBitte teilen Sie uns folgende Informationen mit:\nRechnungsnummer, Datum der Rechnung und Gerätetyp.',
            en: '(Of course free of charge in the event of a warranty or guarantee claim)\n\nPlease note the manufacturer\'s warranty information.\n\nOur customer advisors will be happy to help you.\nCall us or write an email! at-implantate@t-online.de\n\nPlease let us know the following information:\nInvoice number, date of the invoice and device type.'
        },
        benefitBar: {
            de: 'QUALITÄT - VERTRAUEN - SERVICE',
            en: 'QUALITY - TRUST - SERVICE'
        },
        images: {
            hero: ''
        },
        variants: [],
        articles: []
    },
    {
        id: 'versand',
        type: 'info',
        name: {
            de: 'Versand',
            en: 'Shipping'
        },
        title: {
            de: 'Versand',
            en: 'Shipping'
        },
        description: {
            de: 'Details zum Versand und zur Lieferung.',
            en: 'Details about shipping and delivery.'
        },
        subDescription: {
            de: 'Lieferzeiten und Bedingungen',
            en: 'Delivery times and conditions'
        },
        applicationArea: {
            de: 'Weltweiter Versand verfügbar.',
            en: 'Worldwide shipping available.'
        },
        benefitBar: {
            de: 'SCHNELL - ZUVERLÄSSIG - SICHER',
            en: 'FAST - RELIABLE - SECURE'
        },
        images: {
            hero: ''
        },
        variants: [],
        articles: []
    },
    {
        id: 'bezahlung',
        type: 'info',
        name: {
            de: 'Bezahlung',
            en: 'Payment'
        },
        title: {
            de: 'Bezahlung',
            en: 'Payment'
        },
        description: {
            de: 'Preise und Zahlungen\nDie Preise verstehen sich als Waren-, Dienstleistungswert ohne Nachlässe sowie zuzüglich der jeweils gültigen Umsatzsteuer.\nMit Erscheinen eines neuen Kataloges werden alle früheren Preislisten ungültig.\nUnsere Rechnungen sind sofort fällig und binnen 14 Tagen ab Rechnungsdatum fällig, soweit nichts anderes vereinbart ist.',
            en: 'Prices and Payments\nPrices are valued as goods and services without discounts and plus the currently applicable VAT.\nWith the release of a new catalog, all previous price lists become invalid.\nOur invoices are due immediately and within 14 days of the invoice date, unless otherwise agreed.'
        },
        subDescription: {
            de: 'Zahlungsbedingungen',
            en: 'Payment Terms'
        },
        applicationArea: {
            de: 'Rechnungskauf möglich.',
            en: 'Purchase on account possible.'
        },
        benefitBar: {
            de: 'TRANSPARENZ - SICHERHEIT - VERTRAUEN',
            en: 'TRANSPARENCY - SECURITY - TRUST'
        },
        images: {
            hero: ''
        },
        variants: [],
        articles: []
    },
    {
        id: 'widerrufsrecht',
        type: 'info',
        name: {
            de: 'Widerrufsrecht',
            en: 'Right of Withdrawal'
        },
        title: {
            de: 'Widerrufsrecht',
            en: 'Right of Withdrawal'
        },
        description: {
            de: 'Widerrufsbelehrung\n\nDetails zum Widerrufsrecht für Verbraucher.',
            en: 'Cancellation Policy\n\nDetails of the right of withdrawal for consumers.'
        },
        subDescription: {
            de: 'Ihre Sicherheit beim Kauf',
            en: 'Your security when purchasing'
        },
        applicationArea: {
            de: 'Gesetzliches Widerrufsrecht.',
            en: 'Statutory right of withdrawal.'
        },
        benefitBar: {
            de: 'SCHUTZ - TRANSPARENZ - KLARE REGELN',
            en: 'PROTECTION - TRANSPARENCY - CLEAR RULES'
        },
        images: {
            hero: ''
        },
        variants: [],
        articles: []
    },
    {
        id: 'agb',
        type: 'info',
        name: {
            de: 'AGB',
            en: 'T&C'
        },
        title: {
            de: 'Verkaufs- und Lieferungsbedingungen',
            en: 'Terms and Conditions'
        },
        description: {
            de: '1. Allgemein\nDiese Lieferbedingungen gelten für alle von uns vertriebenen Produkte. Mit der Auftragserteilung anerkennt der Vertragspartner unsere Bedingungen. Entgegenstehende Bedingungen gelten nur, wenn diese schriftlich vereinbart werden.\n\n2. Vertragsabschluss, Vertragsinhalt\nEin Vertrag kommt erst mit unserer schriftlichen Auftragsbestätigung oder mit Auslieferung der vereinbarten Leistungen zustande. Schriftform gilt auch für Zusicherungen, Nebenabreden und nachträgliche Änderungen. Der Besteller ist an dem erteilten Auftrag gebunden. Der Kunde erklärt sich damit einverstanden, dass wir Auskünfte über seine Bonität einholen. Bei negativer Prüfung behalten wir uns die Nichterfüllung des Auftrages vor.',
            en: '1. General\nThese delivery conditions apply to all products sold by us. By placing an order, the contractual partner acknowledges our conditions. Conflicting conditions only apply if they are agreed in writing.\n\n2. Conclusion of contract, contract content\nA contract is only concluded with our written order confirmation or with the delivery of the agreed services. Written form also applies to assurances, side agreements and subsequent changes. The customer is bound by the order placed. The customer agrees that we may obtain information about his creditworthiness. In the event of a negative check, we reserve the right not to fulfill the order.'
        },
        subDescription: {
            de: '3. Preise und Zahlungen\nDie Preise verstehen sich als Waren-, Dienstleistungswert ohne Nachlässe sowie zuzüglich der jeweils gültigen Umsatzsteuer. Mit Erscheinen eines neuen Kataloges werden alle früheren Preislisten ungültig. Unsere Rechnungen sind sofort fällig und binnen 14 Tagen ab Rechnungsdatum fällig, soweit nichts anderes vereinbart ist.',
            en: '3. Prices and Payments\nPrices are to be understood as the value of goods and services without discounts and plus the currently applicable VAT. When a new catalogue appears, all previous price lists become invalid. Our invoices are due immediately and within 14 days of the invoice date, unless otherwise agreed.'
        },
        applicationArea: {
            de: '4. Gefahrenübergang, Kontrolle, Reklamationspflicht\nDie Gefahr geht mit der Auslieferung an den Versandbeauftragten auf den Auftraggeber über. Nur auf besonderen schriftlichen Auftrag des Bestellers veranlassen wir auf Kosten des Bestellers den Abschluss von Versicherungen. Der Vertragspartner ist verpflichtet, die Ware auf Mängel zu prüfen und etwaige Mängel unverzüglich, längstens binnen 14 Tagen schriftlich zu reklamieren.\n\n5. Gewährleistungen, Rückgaberecht\nSoweit im Folgenden nichts Abweichendes bestimmt ist, leisten wir für die gelieferten Produkte in der Weise Gewähr, dass wir die Produkte durch einwandfreie Produkte ersetzen. Die Frist für die Verjährung des Anspruchs auf Gewährleistung beträgt vom Tage des Gefahrübergangs an gerechnet 12 Monate. Der Besteller ist verpflichtet, uns festgestellte Material-, Liefer- oder Herstellungsfehler sowie Transportschäden unverzüglich nach Erhalt mitzuteilen. Für Verbrauchsmaterialien hat der Besteller innerhalb von 14 Tagen für von uns gelieferte Ware ein Rückgaberecht.',
            en: '4. Transfer of risk, control, obligation to complain\nThe risk passes to the client upon delivery to the shipping agent. We only arrange for the conclusion of insurance policies at the customer\'s expense upon special written order from the customer. The contractual partner is obliged to check the goods for defects and to complain about any defects in writing without delay, at the latest within 14 days.\n\n5. Warranties, right of return\nUnless otherwise specified below, we provide a warranty for the delivered products by replacing the products with perfect products. The period for the limitation of the claim for warranty is 12 months starting from the day of the transfer of risk. The customer is obliged to inform us immediately after receipt of any material, delivery or manufacturing errors discovered as well as transport damage. For consumables, the customer has a right of return for goods delivered by us within 14 days.'
        },
        benefitBar: {
            de: '6. Ausschluss von Schadensersatz, Haftungsbegrenzung, Rücktritt\n7. Eigentumsvorbehalt\n8. Gerichtsstand: München\n9. Nebenabreden',
            en: '6. Exclusion of damages, limitation of liability, withdrawal\n7. Retention of title\n8. Place of jurisdiction: Munich\n9. Side agreements'
        },
        images: {
            hero: ''
        },
        variants: [],
        articles: []
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
