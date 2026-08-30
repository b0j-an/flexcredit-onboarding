import { EmployeeProfile, ManagementLeader, Colleague, SalesRegion, QuizQuestion, ChecklistItem, StrategicGoal } from '../types';

export const defaultProfile: EmployeeProfile = {
  name: 'Svetozar Mišić',
  gender: 'male',
  role: 'Saradnik za radne odnose',
  connectedRole: 'Ljudski resursi',
  department: 'Ljudski Resursi',
  mentorName: 'Aleksandra Antešević',
  mentorTitle: 'Saradnik u ljudskim resursima',
  mentorDescription: 'Aleksandra će ti biti glavna podrška pri upoznavanju s timom, procesima i svakodnevnim radom na poziciji saradnika za radne odnose.',
  mentorPhoto: '/assets/team/aleksandra-antesevic.png',
  managerName: 'Sanja Knežević',
  managerTitle: 'Regionalni menadžer ljudskih resursa',
  startDate: '2026-09-01',
  officeLocation: 'Sjedište, Banja Luka',
};

export const sampleProfiles: EmployeeProfile[] = [
  defaultProfile,
  {
    name: 'Amar Hadžić',
    gender: 'male',
    role: 'Specijalista za korisničku podršku',
    connectedRole: 'Customer Success',
    department: 'Operativna Podrška / Kontakt Centar',
    mentorName: 'Lejla Kovačević',
    mentorTitle: 'Senior Customer Success Mentor',
    mentorDescription: 'Lejla će biti Amarova glavna podrška pri upoznavanju tima, komunikacionih standarda i naprednih procesa podrške klijentima.',
    managerName: 'Dejana Tominčić',
    managerTitle: 'Regionalni menadžer Kontakt centra',
    startDate: '2026-09-01',
    officeLocation: 'Kontakt Centar, Banja Luka',
  },
  {
    name: 'Slađana Mašić',
    gender: 'female',
    role: 'Savjetnik za klijente',
    connectedRole: 'Prodajna Mreža',
    department: 'Prodaja',
    mentorName: 'Sanja Lučić',
    mentorTitle: 'Regionalni menadžer',
    mentorDescription: 'Sanja će biti Slađanina mentorka za savladavanje prodajnih alata, standarda komunikacije sa klijentima i rada u filijali.',
    managerName: 'Nenad Marjanović',
    managerTitle: 'Menadžer prodaje',
    startDate: '2026-09-01',
    officeLocation: 'Regija Sarajevo',
  },
  {
    name: 'Nikola Jovanović',
    gender: 'male',
    role: 'Finansijski analitičar',
    connectedRole: 'Finansijsko planiranje i analiza',
    department: 'Računovodstvo i Finansije',
    mentorName: 'Bojan Šikora',
    mentorTitle: 'Finansijski analitičar',
    mentorDescription: 'Bojan će ti pružiti punu podršku u upoznavanju finansijskih modela, izvještavanja i analitike poslovanja.',
    managerName: 'Nevena Ilić',
    managerTitle: 'Direktor finansija i računovodstva',
    startDate: '2026-09-01',
    officeLocation: 'Sjedište, Banja Luka',
  }
];

export const managementTeam: ManagementLeader[] = [
  {
    id: 'radmila-bjeljac',
    name: 'Radmila Bjeljac',
    role: 'Country Manager BiH i CG',
    department: 'Top Menadžment',
    photo: '/assets/team/radmila-bjeljac.png',
    bio: 'Sa preko 20 godina u finansijskom sektoru, sticala je iskustvo na ključnim rukovodećim pozicijama. Njen stručni fokus obuhvata liderstvo u svim aspektima, uključujući izgradnju i vođenje timova, kao i razvoj istih. Posjeduje izraženu odlučnost, sistematičan pristup i vještine rješavanja problema. Njena reputacija sinonim je za integritet, stabilnost i snagu u poslovnom okruženju.',
    highlights: ['20+ godina liderstva u finansijama', 'Strateško upravljanje BiH & CG operacijama', 'Razvoj i vođenje vrhunskih timova', 'Sinonim za stabilnost i integritet']
  },
  {
    id: 'nenad-marjanovic',
    name: 'Nenad Marjanović',
    role: 'Menadžer prodaje',
    department: 'Prodaja',
    photo: '/assets/team/nenad-marjanovic.jpg',
    bio: 'Bogato radno iskustvo u mikrokreditnom sektoru, na različitim pozicijama u toku 20-ogodišnjeg radnog staža. Posvećen, istrajan, otvorenog uma. Izuzetno talentovan za rad sa ljudima. Uz njegovo vođstvo, svaki izazov u radu je moguće uspješno savladati. U tome mu pomaže i njegov vedri duh, pozitivan stav i odličan smisao za humor.',
    highlights: ['20 godina ekspertize u mikrokreditiranju', 'Vrhunski menadžment prodajne mreže (61 filijala)', 'Motivator i lider sa pozitivnom energijom', 'Razvoj prodajnih kanala i timova']
  },
  {
    id: 'natasa-majstorovic',
    name: 'Nataša Majstorović',
    role: 'Regionalni operativni direktor',
    department: 'Operativna Podrška',
    photo: '/assets/team/natasa-majstorovic.png',
    bio: 'Više od 17 godina radnog iskustva u finansijskom sektoru. Ističe se po svojoj stručnosti u konceptualizaciji rešenja i njihovoj efikasnoj implementaciji. Kreativna, analitična, ima inicijativu i odlučnost, čime se ističe kao stručnjak koji uspješno sprovodi kompleksne poslovne strategije. Ima radnu etiku poput mrava.',
    highlights: ['17+ godina operativnog liderstva', 'Optimizacija procesa i skaliranje poslovanja', 'Besprekorna egzekucija i analitika', 'Inicijativa i visoka radna etika']
  },
  {
    id: 'nevena-ilic',
    name: 'Nevena Ilić',
    role: 'Direktor finansija i računovodstva',
    department: 'Finansije i Računovodstvo',
    photo: '/assets/team/nevena-ilic.png',
    bio: 'Posjeduje više od 12 godina profesionalnog iskustva u oblastima računovodstva, finansija i upravljanja poslovnim procesima. Svoj rad gradi na odgovornosti, pouzdanosti i stručnosti. Kao predavač na kursu računovodstva i mentor mlađim kolegama, doprinosi razvoju tima kroz stručnu podršku, otvorenu saradnju i kontinuirano dijeljenje iskustva.',
    highlights: ['12+ godina iskustva u finansijskom upravljanju', 'Predavač i certificirani mentor', 'Upravljanje finansijskim procesima i revizijom', 'Usmjerena na razvoj stručnih kadrova']
  },
  {
    id: 'mirna-djukic-svraka',
    name: 'Mirna Đukić Švraka',
    role: 'Regionalni direktor marketinga',
    department: 'Marketing',
    photo: '/assets/team/mirna-djukic-svraka.png',
    bio: 'S više od 15 godina iskustva u finansijskom sektoru i bogatom karijerom u oblasti marketinga, prošla je kroz gotovo sve segmente marketinške profesije. Njene vještine uključuju kreativnost, strateško planiranje, upravljanje budžetima i razvoj dugoročnih ideja. Ističe se željom za učenjem, praćenjem trendova i novim inicijativama, uz izražen osjećaj za stil i estetiku.',
    highlights: ['15+ godina brendinga u finansijskom sektoru', 'Strateški marketing i digitalne kampanje', 'Kreativno vođstvo za 2 ključna brenda', 'Izražen osjećaj za estetiku i inovacije']
  }
];

export const allColleagues: Colleague[] = [
  // Top Management
  { id: '1', name: 'Radmila Bjeljac', role: 'Country Manager BiH i CG', department: 'Uprava', photoUrl: '/assets/team/radmila-bjeljac.png' },
  
  // HR
  { id: '2', name: 'Sanja Knežević', role: 'Regionalni menadžer ljudskih resursa', department: 'Ljudski Resursi', photoUrl: '/assets/team/sanja-knezevic.png' },
  { id: '3', name: 'Aleksandra Antešević Đurić', role: 'Saradnik u ljudskim resursima', department: 'Ljudski Resursi', photoUrl: '/assets/team/aleksandra-antesevic.png' },
  { id: '4', name: 'Marija Mitrović', role: 'Saradnik za radne odnose', department: 'Ljudski Resursi' },
  
  // IT
  { id: '5', name: 'Aljoša Trninić', role: 'Regionalni menadžer za IT i bezbjednost IS', department: 'IT Podrška' },
  { id: '6', name: 'Mićo Stevandić', role: 'Koordinator tehničke podrške i mrežne administracije', department: 'IT Podrška' },
  { id: '7', name: 'Dalibor Božinović', role: 'Sistem administrator', department: 'IT Podrška' },
  
  // Marketing
  { id: '8', name: 'Mirna Đukić Švraka', role: 'Regionalni direktor marketinga', department: 'Marketing', photoUrl: '/assets/team/mirna-djukic-svraka.png' },
  { id: '9', name: 'Igor Martinović', role: 'Menadžer digitalnog marketinga', department: 'Marketing' },
  { id: '10', name: 'Rade Šegrt', role: 'Specijalista za marketing i odnose sa javnošću', department: 'Marketing' },
  { id: '11', name: 'Dragan Ostić', role: 'Koordinator promotivnih aktivnosti i aktivacija u mreži', department: 'Marketing' },
  
  // Audit / Control
  { id: '12', name: 'Vesna Milekić', role: 'Interni revizor', department: 'Revizija i Kontrola' },
  { id: '13', name: 'Marko Pejić', role: 'Interni kontrolor', department: 'Revizija i Kontrola' },
  
  // Operations & Risk
  { id: '14', name: 'Nataša Majstorović', role: 'Regionalni operativni direktor', department: 'Operativna Podrška', photoUrl: '/assets/team/natasa-majstorovic.png' },
  { id: '15', name: 'Marina Lipovčić', role: 'Regionalni menadžer za upravljanje rizicima', department: 'Operativna Podrška' },
  { id: '16', name: 'Dejana Tominčić', role: 'Regionalni menadžer Kontakt centra', department: 'Operativna Podrška' },
  { id: '17', name: 'Nebojša Ćulum', role: 'Rukovodilac službe naplate', department: 'Operativna Podrška' },
  { id: '18', name: 'Nataša Kovačević', role: 'Kreditni analitičar i specijalista za operativnu podršku', department: 'Operativna Podrška' },
  { id: '19', name: 'Suzana Dimitrovski', role: 'Koordinator projekata i sistemskih unapređenja', department: 'Operativna Podrška' },
  { id: '20', name: 'Milica Rokvić', role: 'Koordinator operativne i analitičke podrške u KC', department: 'Operativna Podrška' },
  { id: '21', name: 'Jelena Milidragović', role: 'Koordinator službe prodaje', department: 'Operativna Podrška' },
  { id: '22', name: 'Suzana Popadić', role: 'Koordinator službe naplate', department: 'Operativna Podrška' },
  { id: '23', name: 'Miloš Runić', role: 'Biznis developer za prodaju osiguranja u mreži', department: 'Osiguranje' },
  
  // Finance & Accounting
  { id: '24', name: 'Nevena Ilić', role: 'Direktor finansija i računovodstva', department: 'Finansije i Računovodstvo', photoUrl: '/assets/team/nevena-ilic.png' },
  { id: '25', name: 'Jovana Jokić', role: 'Rukovodilac finansija i računovodstva', department: 'Finansije i Računovodstvo' },
  { id: '26', name: 'Gorana Janjetović', role: 'Specijalista za obračun zarada', department: 'Finansije i Računovodstvo' },
  { id: '27', name: 'Jovana Puzić', role: 'Saradnik za poslove finansijske operative', department: 'Finansije i Računovodstvo' },
  { id: '28', name: 'Tamara Stojić', role: 'Saradnik za poslove finansijske operative', department: 'Finansije i Računovodstvo' },
  { id: '29', name: 'Mira Cvijan', role: 'Menadžer fin. planiranja, izvještavanja i administracije', department: 'Finansije i Računovodstvo' },
  { id: '30', name: 'Bojan Šikora', role: 'Finansijski analitičar', department: 'Finansije i Računovodstvo' },
  { id: '31', name: 'Danijela Jungić', role: 'Biznis analitičar', department: 'Finansije i Računovodstvo' },
  { id: '32', name: 'Jelena Pešević', role: 'Koordinator nabavki i administracije', department: 'Finansije i Računovodstvo' },
  { id: '33', name: 'Aleksandar Brnić', role: 'Vozač i menadžer voznog parka', department: 'Finansije i Računovodstvo' },
  { id: '34', name: 'Lana Nežić', role: 'Saradnik za administraciju i arhivu', department: 'Finansije i Računovodstvo' },
  { id: '35', name: 'Tatjana Lončar', role: 'Saradnik za administraciju i arhivu', department: 'Finansije i Računovodstvo' },
  
  // Legal
  { id: '36', name: 'Andrea Mikić', role: 'Rukovodilac službe za pravne poslove i regulatornu usklađenost', department: 'Pravna Podrška' },
  { id: '37', name: 'Nikolija Ostojić', role: 'Stručni saradnik za pravne poslove i usklađenost', department: 'Pravna Podrška' },
  { id: '38', name: 'Aleksandar Žigić', role: 'Stručni saradnik za sudsku naplatu', department: 'Pravna Podrška' },
  { id: '39', name: 'Aleksandra Đukić', role: 'Asistent za poslove sudske naplate', department: 'Pravna Podrška' },
  
  // Sales Leadership & Regional Managers
  { id: '40', name: 'Nenad Marjanović', role: 'Menadžer prodaje', department: 'Prodaja', photoUrl: '/assets/team/nenad-marjanovic.jpg' },
  { id: '41', name: 'Željko Šinik', role: 'Regionalni menadžer - Regija Banja Luka', department: 'Prodaja', region: 'Banja Luka' },
  { id: '42', name: 'Goran Srdić', role: 'Regionalni menadžer - Regija Prijedor', department: 'Prodaja', region: 'Prijedor' },
  { id: '43', name: 'Goran Petrović', role: 'Regionalni menadžer - Regija Doboj', department: 'Prodaja', region: 'Doboj' },
  { id: '44', name: 'Edisa Dervišagić', role: 'Regionalni menadžer - Regija Brčko', department: 'Prodaja', region: 'Brčko' },
  { id: '45', name: 'Sanja Lučić', role: 'Regionalni menadžer - Regija Sarajevo', department: 'Prodaja', region: 'Sarajevo' },
  { id: '46', name: 'Danijel Mijić', role: 'Regionalni menadžer - Regija Bijeljina', department: 'Prodaja', region: 'Bijeljina' },
  { id: '47', name: 'Nikola Bjelović', role: 'Regionalni menadžer - Regija Trebinje', department: 'Prodaja', region: 'Trebinje' },
];

export const companyMetrics = [
  { id: 'branches', label: 'Filijala u prodajnoj mreži', value: '61', sub: 'Prva MKO u RS po broju filijala', icon: 'Store' },
  { id: 'agents', label: 'Mjesta u Poštama RS', value: '67', sub: 'Široka agentska partnerska mreža', icon: 'Building2' },
  { id: 'contact', label: 'Operatera u Kontakt centru', value: '40+', sub: 'Brza i direktna podrška klijentima', icon: 'Headphones' },
  { id: 'clients', label: 'Aktivnih klijenata', value: '20.000+', sub: 'Kontinuirani rast povjerenja', icon: 'Users' },
  { id: 'loans', label: 'Isplaćenih kredita', value: '199.000', sub: 'Finansijska stabilnost za građane', icon: 'CheckCircle' },
  { id: 'employees', label: 'Zaposlenih stručnjaka', value: '230', sub: 'Naši ljudi su naš najveći brend', icon: 'Award' },
];

export const salesRegions: SalesRegion[] = [
  {
    id: 'banja-luka',
    name: 'Area Banja Luka',
    manager: 'Željko Šinik',
    color: '#3DB3F0',
    cities: ['Banja Luka', 'Gradiška', 'Nova Topola', 'Laktaši', 'Trn', 'Čelinac', 'Kotor Varoš', 'Kneževo', 'Mrkonjić Grad', 'Šipovo', 'Srbac', 'Prnjavor'],
    branches: 14,
    description: 'Najveća prodajna regija i operativni centar sa najgušćom mrežom filijala.'
  },
  {
    id: 'prijedor',
    name: 'Area Prijedor',
    manager: 'Goran Srdić',
    color: '#0F73A3',
    cities: ['Prijedor', 'Novi Grad', 'Kozarska Dubica', 'Kostajnica'],
    branches: 7,
    description: 'Zapadna regija sa izuzetnim udjelom na tržištu i dugom tradicijom lojalnosti.'
  },
  {
    id: 'doboj',
    name: 'Area Doboj',
    manager: 'Goran Petrović',
    color: '#8DC63F',
    cities: ['Doboj', 'Derventa', 'Brod', 'Modriča', 'Teslić', 'Stanari', 'Petrovo'],
    branches: 9,
    description: 'Centralni saobraćajni i privredni čvor sa odličnim stopama rasta.'
  },
  {
    id: 'brcko',
    name: 'Area Brčko',
    manager: 'Edisa Dervišagić',
    color: '#EAB308',
    cities: ['Brčko', 'Šamac', 'Pelagićevo', 'Gradačac', 'Srebrenik', 'Gračanica'],
    branches: 8,
    description: 'Posavsko-distriktna regija sa dinamičnim razvojem malih privrednika.'
  },
  {
    id: 'bijeljina',
    name: 'Area Bijeljina',
    manager: 'Danijel Mijić',
    color: '#F97316',
    cities: ['Bijeljina', 'Janja', 'Ugljevik', 'Lopare', 'Zvornik', 'Bratunac', 'Vlasenica', 'Milići'],
    branches: 10,
    description: 'Semberija i Podrinje - strateški važna regija sa visokom lojalnošću korisnika.'
  },
  {
    id: 'sarajevo',
    name: 'Area Sarajevo',
    manager: 'Sanja Lučić',
    color: '#A855F7',
    cities: ['Istočno Sarajevo', 'Istočna Ilidža', 'Pale', 'Sokolac', 'Rogatica', 'Rudo', 'Čajniče', 'Foča'],
    branches: 8,
    description: 'Sarajevsko-romanijska regija i gornje Podrinje sa odličnim plasmanima.'
  },
  {
    id: 'trebinje',
    name: 'Area Trebinje',
    manager: 'Nikola Bjelović',
    color: '#EF4444',
    cities: ['Trebinje', 'Bileća', 'Gacko', 'Nevesinje'],
    branches: 5,
    description: 'Hercegovačka regija sa specifičnim sezonskim i preduzetničkim profilom.'
  }
];

export const strategicGoals: StrategicGoal[] = [
  {
    id: 'geo',
    title: 'Geografsko širenje',
    description: 'Otvaranje novih modernih poslovnica i približavanje uslugama u svim manjim i većim zajednicama.',
    icon: 'MapPin',
    impact: 'Povećanje dostupnosti za 25%'
  },
  {
    id: 'channels',
    title: 'Razvoj prodajnih kanala',
    description: 'Sinergija digitalnih kanala, kontakt centra, Pošta RS agentske mreže i fizičkih filijala.',
    icon: 'Network',
    impact: 'Omnichannel korisničko iskustvo'
  },
  {
    id: 'products',
    title: 'Razvoj proizvoda i brendova',
    description: 'Inoviranje ponude za brendove Flex Credit i Uzmi novac prilagođeno potrebama građana.',
    icon: 'Layers',
    impact: 'Veća fleksibilnost i prilagodljivost'
  },
  {
    id: 'marketing',
    title: 'Jaka marketinška podrška',
    description: 'Ciljane kampanje, prepoznatljiv vizuelni identitet i transparentna komunikacija vrijednosti.',
    icon: 'Megaphone',
    impact: 'Maksimalna vidljivost brenda'
  },
  {
    id: 'optimization',
    title: 'Optimizacija procesa',
    description: 'Digitalizacija odobravanja kredita, smanjenje birokratije i ubrzanje isplate do par minuta.',
    icon: 'Zap',
    impact: 'Vrijeme obrade svedeno na minimum'
  },
  {
    id: 'performance',
    title: 'Sveobuhvatno upravljanje učinkom',
    description: 'Nagrađivanje truda, kontinuirane edukacije zaposlenih i jasna metrika ličnog napredovanja.',
    icon: 'TrendingUp',
    impact: 'Motivisan i stručan tim od 230+ ljudi'
  }
];

export const integrationSteps = [
  { step: 1, title: 'Upoznavanje sa kompanijom', desc: 'Istorijat, vrijednosti, organizacija i kultura', icon: 'Building' },
  { step: 2, title: 'Upoznavanje sa kolegama', desc: 'Povezivanje sa timom, mentorom i rukovodiocima', icon: 'Users' },
  { step: 3, title: 'Tvoja uloga i očekivanja', desc: 'Definisanje odgovornosti, alata i ciljeva', icon: 'Briefcase' },
  { step: 4, title: 'Obučavanje i kontinuirana podrška', desc: 'Stručno osposobljavanje uz mentorsku ruku', icon: 'GraduationCap' },
  { step: 5, title: 'Postavljanje ciljeva i zadataka', desc: 'Jasni prioriteti i KPI-jevi za prvi period', icon: 'Target' },
  { step: 6, title: 'Povratne informacije i usmjeravanje', desc: 'Redovni 1-na-1 sastanci i evaluacija napretka', icon: 'MessageSquare' },
  { step: 7, title: 'Testiranje i certifikacija', desc: 'Provjera znanja i prelazak u samostalan rad', icon: 'CheckCircle2' },
];

export const companyValues = [
  {
    title: 'Potpuna posvećenost klijentima',
    desc: 'Cijenimo svaki minut vremena naših klijenata, stoga im obezbjeđujemo potrebna sredstva za kratko vrijeme, bez komplikovanih procedura.',
    icon: 'HeartHandshake'
  },
  {
    title: 'Fleksibilnost i individualan pristup',
    desc: 'Vjerujemo da svako zaslužuje da dobije novac koji mu je potreban, stoga obezbjeđujemo dostupnost različitih proizvoda prilagođenih socijalnom statusu klijenta.',
    icon: 'Sparkles'
  },
  {
    title: 'Međusobno povjerenje',
    desc: 'Gradi se na iskrenoj komunikaciji, profesionalizmu i podršci među kolegama, kao i dugoročnom odnosu sa klijentima.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Transparentnost u radu',
    desc: 'Jasna pravila, bez skrivenih troškova i nejasnih klauzula. Otvoreno i pošteno u svakom koraku.',
    icon: 'Eye'
  }
];

export const employeeBenefits = [
  {
    title: 'Profesionalni razvoj',
    desc: 'Kontinuirane interne i eksterne obuke, mentorski programi i razvoj vještina u modernoj finansijskoj industriji.',
    icon: 'BookOpen'
  },
  {
    title: 'Bezrezervna podrška kolega',
    desc: 'Otvorena vrata tima i rukovodstva u svakom trenutku za savjet, pomoć i saradnju.',
    icon: 'Users'
  },
  {
    title: 'Mogućnost napredovanja',
    desc: 'Interno prepoznavanje talenata i otvoren put ka liderskim i ekspertskim pozicijama u kompaniji.',
    icon: 'TrendingUp'
  },
  {
    title: 'Druženja i proslave',
    desc: 'Tradicionalni team building događaji, proslave uspjeha i njegovanje prijateljske atmosfere.',
    icon: 'PartyPopper'
  },
  {
    title: 'Prepoznat i nagrađen trud',
    desc: 'Pravedan sistem bonusa, priznanja za izvanredne rezultate i stimulativno radno okruženje.',
    icon: 'Trophy'
  }
];

export const defaultChecklist: ChecklistItem[] = [
  { id: '1', phase: 'Dan 1', title: 'Preuzimanje opreme i radnog mjesta', description: 'Uređaji, login kredencijali, email i pristup internim aplikacijama.', completed: true },
  { id: '2', phase: 'Dan 1', title: 'Upoznavanje sa mentorom i timom', description: 'Uvodna kafa, upoznavanje sa mentorom i neposrednim rukovodiocem.', completed: true },
  { id: '3', phase: 'Dan 1', title: 'Pregled onboarding prezentacije i pravila', description: 'Upoznavanje sa organizacijom, misijom i kodeksom ponašanja.', completed: false },
  { id: '4', phase: 'Sedmica 1', title: 'Upoznavanje sa softverskim alatima', description: 'Rad u internom CRM/kreditnom sistemu i procedurama odobravanja.', completed: false },
  { id: '5', phase: 'Sedmica 1', title: 'Prvi 1-na-1 sastanak sa rukovodiocem', description: 'Usklađivanje očekivanja i definisanje ciljeva za probni rad.', completed: false },
  { id: '6', phase: 'Mjesec 1', title: 'Samostalno obavljanje osnovnih zadataka', description: 'Uspješno rješavanje prvih predmeta uz nadzor mentora.', completed: false },
  { id: '7', phase: 'Mjesec 1', title: 'Mjesečni feedback razgovor', description: 'Osvrt na prve uspjehe, izazove i plan za dalji razvoj.', completed: false },
  { id: '8', phase: 'Mjesec 3', title: 'Završna evaluacija probnog rada', description: 'Potvrda samostalnosti i formalno uključenje u stalni razvojni plan.', completed: false },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Kojoj snažnoj finansijskoj grupaciji pripada Flex Credit?',
    options: ['MVF Finance', 'Balkan Credit Group', 'Capital Holding', 'Alpe Adria Fund'],
    correctIndex: 0,
    explanation: 'Flex Credit je ponosni dio međunarodne MVF Finance finansijske grupacije.'
  },
  {
    id: 2,
    question: 'Koliko filijala broji prodajna mreža Flex Credita u Republici Srpskoj?',
    options: ['25 filijala', '42 filijale', '61 filijala', '85 filijala'],
    correctIndex: 2,
    explanation: 'Sa 61 filijalom, Flex Credit je prva mikrokreditna organizacija u RS po broju poslovnica.'
  },
  {
    id: 3,
    question: 'Koja dva brenda čine portfolio kompanije?',
    options: ['Flex Credit i Brzi Keš', 'Flex Credit i Uzmi novac', 'Flex Credit i Easy Loan', 'Uzmi novac i Mikro Fin'],
    correctIndex: 1,
    explanation: 'Kompanija uspješno posluje kroz dva prepoznatljiva brenda: Flex Credit i Uzmi novac.'
  },
  {
    id: 4,
    question: 'Koliko otprilike zaposlenih stručnjaka čini tim kompanije?',
    options: ['50', '120', '230', '400'],
    correctIndex: 2,
    explanation: 'Kompanija broji preko 230 posvećenih profesionalaca koji su naš najveći brend.'
  },
  {
    id: 5,
    question: 'Koja je ključna vrijednost i misija u odnosu sa klijentima?',
    options: ['Cijeniti svaki minut klijenta bez komplikovanih procedura', 'Samo administrativna provjera dokumenata', 'Fokus isključivo na visoke iznose', 'Kompleksne procedure za svaku uplatu'],
    correctIndex: 0,
    explanation: 'Naša filozofija je da cijenimo vrijeme klijenata i omogućimo brza, dostupna sredstva bez nepotrebnih komplikacija.'
  }
];
