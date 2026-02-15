export interface Module {
  id: string;
  name: string;
  slug: string;
  icon: string; // lucide icon name
  description: string;
  screenshot: string;
  route: string;
  category: 'core' | 'management' | 'support';
  features: string[];
  userStory: string;
  dataSource?: string[];
  relatedModules?: string[];
}

export const modules: Module[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    slug: 'dashboard',
    icon: 'LayoutDashboard',
    description: 'Overzicht van je bedrijf in één oogopslag',
    screenshot: '/screenshots/modules/dashboard.png',
    route: '/modules/dashboard',
    category: 'core',
    features: [
      'Planning voor vandaag en morgen',
      'Offerte status monitoring',
      'Facturen met "te laat" waarschuwingen',
      'Winstgrafieken (6 maanden)',
      'Realtime KPI\'s'
    ],
    userStory: 'Zie direct wat er vandaag op de planning staat, welke offertes nog wachten op reactie, en welke facturen te laat zijn. Alle belangrijke cijfers van je bedrijf in één overzicht.',
    dataSource: ['quotes', 'invoices', 'planning_entries', 'payments'],
    relatedModules: ['offertes', 'facturen', 'winst', 'planning']
  },
  {
    id: 'offertes',
    name: 'Offertes',
    slug: 'offertes',
    icon: 'FileText',
    description: 'Beheer al je offertes op één plek',
    screenshot: '/screenshots/modules/Offertes.png',
    route: '/modules/offertes',
    category: 'core',
    features: [
      'Realtime lijst met zoeken en filteren',
      'Status filters: Concept, Verzonden, Geaccepteerd',
      'Start nieuwe offerte: zonder klant, met bestaande klant, of nieuwe klant',
      'Archiveer afgewezen of verlopen offertes',
      'Link naar 6-stappen calculatie wizard'
    ],
    userStory: 'Overzicht van al je offertes met directe acties: nieuwe calculatie starten, offerte openen, of archiveren. Filter snel op status om te zien welke offertes nog afgehandeld moeten worden.',
    dataSource: ['quotes', 'clients'],
    relatedModules: ['klanten', 'facturen', 'planning']
  },
  {
    id: 'facturen',
    name: 'Facturen',
    slug: 'facturen',
    icon: 'Receipt',
    description: 'Van offerte naar betaling',
    screenshot: '/screenshots/modules/Facturen.png',
    route: '/modules/facturen',
    category: 'core',
    features: [
      'Maak facturen vanuit je geaccepteerde offertes',
      'Ondersteunt voorschotfacturen en eindfacturen',
      'Houd betalingen bij per factuur',
      'PDF-generatie met jouw huisstijl',
      'Email-integratie via mailto',
      'Automatische "te laat" waarschuwingen'
    ],
    userStory: 'Zet een geaccepteerde offerte om in een voorschot- of eindfactuur. Houd betalingen bij en zie direct welke facturen te laat zijn. Verstuur professionele PDF-facturen met één klik.',
    dataSource: ['invoices', 'invoices/{id}/payments', 'quotes'],
    relatedModules: ['offertes', 'winst', 'instellingen']
  },
  {
    id: 'winst',
    name: 'Winst',
    slug: 'winst',
    icon: 'TrendingUp',
    description: 'Inzicht in je winstgevendheid',
    screenshot: '/screenshots/modules/Winst.png',
    route: '/modules/winst',
    category: 'core',
    features: [
      'Bekijk je financiële prestaties over 1, 3, 6, of 12 maanden',
      'KPI\'s: geprognotiseerde winst, ontvangen betalingen, openstaand',
      'Te-laat-risico monitoring',
      'Cash-in ratio visualisatie',
      'Export naar CSV of PDF'
    ],
    userStory: 'Krijg inzicht in je winstgevendheid over verschillende perioden. Zie direct wat je forecast is, hoeveel er openstaand is, en welke facturen risico lopen. Ideaal voor financiële planning.',
    dataSource: ['quotes', 'invoices', 'payments'],
    relatedModules: ['facturen', 'offertes', 'dashboard']
  },
  {
    id: 'planning',
    name: 'Planning',
    slug: 'planning',
    icon: 'Calendar',
    description: 'Organiseer je projecten en medewerkers',
    screenshot: '/screenshots/modules/Planning.png',
    route: '/modules/planning',
    category: 'management',
    features: [
      'Week- en maandweergave',
      'Sleep planningsitems door de kalender',
      'Koppel aan offertes en klussen',
      'Configureer werkuren, werktijden, werkdagen',
      'Auto-split voor langere projecten'
    ],
    userStory: 'Plan je klussen in week- of maandoverzicht. Koppel direct aan je offertes en zie in het dashboard wat er vandaag en morgen op de planning staat. Ideaal voor overzicht en klantcommunicatie.',
    dataSource: ['planning_entries', 'quotes', 'users.settings.planningSettings'],
    relatedModules: ['dashboard', 'offertes', 'instellingen']
  },
  {
    id: 'producten',
    name: 'Producten',
    slug: 'producten',
    icon: 'Package',
    description: 'Beheer je materiaalcatalogus',
    screenshot: '/screenshots/modules/Producten.png',
    route: '/modules/producten',
    category: 'management',
    features: [
      '100+ materiaalprijzen beheren',
      'Zoeken, filteren, sorteren en pagineren',
      'Nieuwe materialen toevoegen: Calculatie Product (met dimensies) of Los Artikel',
      'Prijzen updaten vanuit leveranciers',
      'Vraag AI prijsimport aan voor je leverancier'
    ],
    userStory: 'Beheer al je materiaalprijzen op één plek. Voeg custom materialen toe, update prijzen, en koppel aan je leveranciers. Bij ontbrekende prijzen vraag je eenvoudig een AI-import aan.',
    dataSource: ['main_material_list (Supabase)'],
    relatedModules: ['instellingen', 'offertes']
  },
  {
    id: 'klanten',
    name: 'Klanten',
    slug: 'klanten',
    icon: 'Users',
    description: 'Jouw klantendatabase',
    screenshot: '/screenshots/modules/Klanten.png',
    route: '/modules/klanten',
    category: 'management',
    features: [
      'Centraal adresboek voor al je klanten',
      'Zakelijk of particulier',
      'Factuuradres en projectadres apart',
      'Zoek op naam, email, plaats',
      'Koppeling met offertes en notities'
    ],
    userStory: 'Bewaar al je klantgegevens op één plek. Bij het maken van een nieuwe offerte kies je eenvoudig een bestaande klant uit je adresboek, of voeg je een nieuwe toe. Zo hoef je nooit twee keer hetzelfde in te vullen.',
    dataSource: ['clients'],
    relatedModules: ['offertes', 'notities']
  },
  {
    id: 'urenregistratie',
    name: 'Urenregistratie',
    slug: 'urenregistratie',
    icon: 'Clock',
    description: 'Registreer je gewerkte uren',
    screenshot: '/screenshots/modules/Urenregistratie.png',
    route: '/modules/urenregistratie',
    category: 'management',
    features: [
      '4 tabbladen: Vandaag, Timer, Corrigeren, Overzicht',
      'Snelle uren of custom uren invoeren',
      'Timer met pauze en afrondregels',
      'Correctiemodus met start/eindtijd',
      'Let op: opslag in localStorage (browser-gebonden)'
    ],
    userStory: 'Houd je uren bij per project. Start de timer bij aanvang van je klus, of vul achteraf je uren in. Ideaal voor nacalculatie en uurtarief-offertes. Werkt lokaal in je browser.',
    dataSource: ['localStorage (geen cloud sync)'],
    relatedModules: ['planning', 'dashboard']
  },
  {
    id: 'notities',
    name: 'Notities',
    slug: 'notities',
    icon: 'StickyNote',
    description: 'Houd persoonlijke notities bij',
    screenshot: '/screenshots/modules/Notities.png',
    route: '/modules/notities',
    category: 'support',
    features: [
      'Notities per klant of algemeen',
      '6 tags: Let op, Aanname, Klant zegt, Later checken, Prijsgevoelig, Beslis nog',
      'Filter op klant',
      'Editmodus en verwijderbevestiging'
    ],
    userStory: 'Maak notities tijdens klantgesprekken of site visits. Tag belangrijke punten zoals "Let op" of "Prijsgevoelig" en koppel aan de juiste klant. Zo vergeet je nooit meer belangrijke afspraken.',
    dataSource: ['notes'],
    relatedModules: ['klanten', 'offertes']
  },
  {
    id: 'archief',
    name: 'Archief',
    slug: 'archief',
    icon: 'Archive',
    description: 'Beheer gearchiveerde documenten',
    screenshot: '/screenshots/modules/Archief.png',
    route: '/modules/archief',
    category: 'support',
    features: [
      'Aparte tabs voor Facturen en Offertes',
      'Herstel optie (zet archived=false)',
      'Permanent verwijderen (batch delete)',
      'Waarschuwing: verwijderen is definitief'
    ],
    userStory: 'Houd je systeem overzichtelijk door afgewezen offertes en oude facturen te archiveren. Per ongeluk gearchiveerd? Herstel met één klik. Definitief opruimen kan ook, maar alleen als je zeker bent.',
    dataSource: ['quotes', 'invoices'],
    relatedModules: ['offertes', 'facturen']
  },
  {
    id: 'instellingen',
    name: 'Instellingen',
    slug: 'instellingen',
    icon: 'Settings',
    description: 'Configureer je bedrijf en defaults',
    screenshot: '/screenshots/modules/Instellingen.png',
    route: '/modules/instellingen',
    category: 'support',
    features: [
      '6 tabbladen: Bedrijfsgegevens, Leveranciers, Calculatie, Offerte Config, Bouwplaats, Planning',
      'Logo en handtekening upload',
      'Standaard marges en uurtarieven',
      'Offerte/factuur nummering en standaardteksten',
      'Bouwplaatskosten pakketten',
      'Planning defaults (werkuren, werkdagen, auto-split)'
    ],
    userStory: 'Stel Calvora in naar jouw bedrijf. Upload je logo, stel je standaard winstmarge in, en configureer je offerte-/factuurnummering. Eenmalig instellen, altijd gebruiken.',
    dataSource: ['users.settings', 'businesses'],
    relatedModules: ['facturen', 'offertes', 'planning', 'producten']
  }
];

// Helper function to get module by slug
export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find(m => m.slug === slug);
}

// Helper function to get modules by category
export function getModulesByCategory(category: Module['category']): Module[] {
  return modules.filter(m => m.category === category);
}

// Export all slugs for static generation
export const moduleSlugs = modules.map(m => m.slug);
