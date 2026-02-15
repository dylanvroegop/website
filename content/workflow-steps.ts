export interface WorkflowStep {
  number: number;
  title: string;
  description: string;
  progress: number; // 10, 20, 40, 60, 80, 100
  screenshot: string;
  features: string[];
  extraScreenshots?: { title: string; image: string }[];
}

export const workflowSteps: WorkflowStep[] = [
  {
    number: 1,
    title: 'Klantinformatie',
    description: 'Start met klantgegevens uit je adresboek of voer nieuwe klant in',
    progress: 10,
    screenshot: '/screenshots/workflow/stap-1-klantinformatie.png',
    features: [
      'Kies bestaande klant uit adresboek',
      'Voer nieuwe klant in (bedrijf of particulier)',
      'Automatisch opslaan per veld',
      'Factuuradres en projectadres apart beheren'
    ]
  },
  {
    number: 2,
    title: 'Kies een klus',
    description: 'Selecteer het type klus uit meer dan 10 categorieën',
    progress: 20,
    screenshot: '/screenshots/workflow/stap-2-kies-klus.png',
    features: [
      'Zoek/filter op kluscategorie',
      '10+ klusstypes (wanden, plafonds, vloeren, dak, kozijn, etc.)',
      'Favorieten markeren voor snelle toegang',
      'Meerdere klussen per offerte mogelijk'
    ]
  },
  {
    number: 3,
    title: 'Kies klus type',
    description: 'Specificeer de klusvariant binnen de gekozen categorie',
    progress: 40,
    screenshot: '/screenshots/workflow/stap-3-klustype.png',
    features: [
      'Subtypes binnen categorie (bijv. metaalstud wand, houtskeletwand, voorzetwand)',
      'Type-specifieke workflows',
      'Direct naar materialen of metingen',
      'Favorieten per klus-type'
    ]
  },
  {
    number: 4,
    title: 'Materialen',
    description: 'Stel je materiaallijst samen met werkpakketten of custom materialen',
    progress: 60,
    screenshot: '/screenshots/workflow/stap-4-materialen.png',
    features: [
      'Kies werkpakket (preset) of start nieuw',
      '100+ materiaalcategorieën beschikbaar',
      'Custom materialen toevoegen',
      'Prijzen beheren per materiaal',
      'Materiaallijst delen (PDF, email)',
      'Preset opslaan voor hergebruik'
    ],
    extraScreenshots: [
      { title: 'Werkpakket kiezer', image: '/screenshots/workflow/extras/Extra 1 - Werkpakket kiezer.png' },
      { title: 'Materiaal selector', image: '/screenshots/workflow/extras/Extra 2 - Materiaal selector.png' },
      { title: 'Nieuw materiaal modal', image: '/screenshots/workflow/extras/Extra 3 - Nieuw materiaal modal.png' },
      { title: 'Materiaallijst delen (boven)', image: '/screenshots/workflow/extras/Extra 4 - Materiaallijst delen (boven).png' },
      { title: 'Materiaallijst delen (onder)', image: '/screenshots/workflow/extras/Extra 5 - Materiaallijst delen (onder).png' }
    ]
  },
  {
    number: 5,
    title: 'Metingen',
    description: 'Voer metingen in met visuele preview en automatische berekeningen',
    progress: 80,
    screenshot: '/screenshots/workflow/stap-5-metingen.png',
    features: [
      'Dynamische meetvelden per klustype',
      'Vormkeuze (rectangle, slope, gable, L, U)',
      'Openingen (deuren, ramen) met aftrek',
      'Extra\'s (koof, vensterbank, dagkant)',
      'Visuele preview van je ontwerp',
      'Automatische berekening m²/m³'
    ],
    extraScreenshots: [
      { title: 'Metingen detail', image: '/screenshots/workflow/extras/Extra 6 - Metingen detail.png' }
    ]
  },
  {
    number: 6,
    title: 'Overzicht en extras',
    description: 'Finaliseer met transport, winstmarge en bouwplaatskosten',
    progress: 100,
    screenshot: '/screenshots/workflow/stap-6-overzicht.png',
    features: [
      'Klusvolledigheid check',
      'Transportkosten configureren',
      'Winstmarge percentage instellen',
      'Bouwplaatskosten (pakketten)',
      'Verzendkosten',
      'Defaults opslaan voor volgende keer'
    ]
  }
];

// Workspace tabs that come after the workflow
export interface WorkspaceTab {
  id: string;
  name: string;
  description: string;
  screenshot: string;
}

export const workspaceTabs: WorkspaceTab[] = [
  {
    id: 'materialen',
    name: 'Materialen',
    description: 'Overzicht van alle gekozen materialen met prijzen en hoeveelheden',
    screenshot: '/screenshots/offerte-workspace/offerte-materialen.png'
  },
  {
    id: 'overzicht',
    name: 'Overzicht',
    description: 'Complete kostenoverzicht met materialen, arbeid, en totaalbedragen',
    screenshot: '/screenshots/offerte-workspace/offerte-overzicht.png'
  },
  {
    id: 'arbeid',
    name: 'Arbeid',
    description: 'Arbeidskosten per klus met uurtarief en totale uren',
    screenshot: '/screenshots/offerte-workspace/offerte-arbeid.png'
  },
  {
    id: 'tekeningen',
    name: 'Tekeningen',
    description: 'Technische tekeningen van je metingen voor in de offerte',
    screenshot: '/screenshots/offerte-workspace/offerte-tekening.png'
  },
  {
    id: 'pdf',
    name: 'PDF Preview',
    description: 'Preview van de definitieve PDF-offerte met jouw huisstijl',
    screenshot: '/screenshots/offerte-workspace/offerte-pdfpreview.png'
  },
  {
    id: 'versturen',
    name: 'Versturen',
    description: 'Offerte versturen via email met gegenereerde body en PDF-bijlage',
    screenshot: '/screenshots/offerte-workspace/offerte-mailversturen.png'
  }
];
