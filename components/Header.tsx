
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { BloodDropIcon } from './icons/BloodDropIcon';

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: 'en' | 'bn') => {
    setLanguage(lang);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BloodDropIcon className="h-8 w-8 text-secondary" />
            <span className={`text-xl font-bold text-primary ${language === 'bn' ? 'font-display' : 'font-sans'}`}>{t('appName')}</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-full">
               <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${language === 'en' ? 'bg-primary text-white' : 'text-gray-600'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('bn')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${language === 'bn' ? 'bg-primary text-white' : 'text-gray-600'}`}
                >
                  BN
                </button>
            </div>
            <Link to="/search" className={`hidden md:block text-gray-600 hover:text-primary transition ${language === 'bn' ? 'font-display' : 'font-sans'}`}>{t('search')}</Link>
            <Link to="/register" className={`hidden md:block text-gray-600 hover:text-primary transition ${language === 'bn' ? 'font-display' : 'font-sans'}`}>{t('register')}</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
