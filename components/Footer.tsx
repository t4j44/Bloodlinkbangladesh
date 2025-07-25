
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Footer = () => {
    const { t, language } = useLanguage();
    return (
        <footer className="bg-white mt-12 py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                <p className={`${language === 'bn' ? 'font-display' : 'font-sans'}`}>
                    &copy; {new Date().getFullYear()} {t('appName')}. {t('tagline')}.
                </p>
            </div>
        </footer>
    );
};
