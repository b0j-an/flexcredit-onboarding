import { Gender } from '../types';

export const getWelcomeGreeting = (gender: Gender, name: string): string => {
  const firstName = name.split(' ')[0] || name;
  const vocative = getVocative(firstName, gender);
  
  if (gender === 'female') {
    return `DOBRO NAM DOŠLA U TIM, ${vocative.toUpperCase()}!`;
  }
  return `DOBRO NAM DOŠAO U TIM, ${vocative.toUpperCase()}!`;
};

export const getVocative = (firstName: string, gender: Gender): string => {
  const clean = firstName.trim();
  if (!clean) return '';
  
  // Serbian/Bosnian vocative basic heuristic for common endings
  if (gender === 'female') {
    if (clean.endsWith('a')) {
      // e.g. Sanja -> Sanja, Jelena -> Jelena, Aleksandra -> Aleksandra
      return clean;
    }
    return clean;
  } else {
    // Male names
    if (clean.endsWith('ar') || clean.endsWith('or')) {
      // Svetozar -> Svetozare, Viktor -> Viktore
      return `${clean}e`;
    }
    if (clean.endsWith('an')) {
      // Bojan -> Bojane, Goran -> Gorane, Dragan -> Dragane, Damjan -> Damjane
      return `${clean}e`;
    }
    if (clean.endsWith('ad')) {
      // Nenad -> Nenade
      return `${clean}e`;
    }
    if (clean.endsWith('ko')) {
      // Marko -> Marko, Željko -> Željko
      return clean;
    }
    if (clean.endsWith('a')) {
      // Nikola -> Nikola, Aljoša -> Aljoša
      return clean;
    }
    if (clean.endsWith('ić')) {
      // Radić -> Radiću
      return `${clean}u`;
    }
    return `${clean}e`;
  }
};

export const getMentorPrefix = (mentorGender: Gender = 'female'): string => {
  return mentorGender === 'female' ? 'Tvoja mentorica je' : 'Tvoj mentor je';
};

export const getGrammarTerms = (gender: Gender) => {
  const isFemale = gender === 'female';
  return {
    welcome: isFemale ? 'Dobro nam došla' : 'Dobro nam došao',
    welcomeShort: isFemale ? 'Dobrodošla' : 'Dobrodošao',
    ready: isFemale ? 'spremna' : 'spreman',
    happy: isFemale ? 'sretna' : 'sretan',
    mentorHeader: isFemale ? 'Tvoja mentorica' : 'Tvoj mentor',
    mentorSupport: isFemale ? 'glavna podrška' : 'glavni oslonac',
    congrats: isFemale ? 'Čestitamo ti na uspjehu!' : 'Čestitamo ti na uspjehu!',
  };
};
