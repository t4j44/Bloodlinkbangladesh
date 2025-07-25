
import { createContext } from 'react';
import { translations } from '../data/translations';

type Language = 'en' | 'bn';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
