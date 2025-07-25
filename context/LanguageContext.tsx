
import React, { useState, ReactNode } from 'react';
import { translations } from '../data/translations';
import { LanguageContext } from './LanguageContextType';

type Language = 'en' | 'bn';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations['en'][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

