
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { BloodDropIcon } from '../components/icons/BloodDropIcon';

export const HomePage = () => {
  const { t, language } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="text-center">
        <BloodDropIcon className="h-24 w-24 text-secondary mx-auto mb-4" />
        <h1 className={`text-4xl md:text-5xl font-bold text-primary ${language === 'bn' ? 'font-display' : 'font-sans'}`}>{t('welcome')}</h1>
        <p className={`mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto ${language === 'bn' ? 'font-display' : 'font-sans'}`}>
          {t('introText')}
        </p>
      </div>

      <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-4">
        <Link
          to="/search"
          className={`w-full md:w-auto text-center btn btn-secondary text-lg shadow-lg ${language === 'bn' ? 'font-display' : 'font-sans'}`}
        >
          {t('findDonor')}
        </Link>
        <Link
          to="/register"
          className={`w-full md:w-auto text-center btn btn-primary text-lg shadow-lg ${language === 'bn' ? 'font-display' : 'font-sans'}`}
        >
          {t('registerAsDonor')}
        </Link>
      </div>

      <div className={`mt-20 p-8 bg-white rounded-lg shadow-md ${language === 'bn' ? 'font-display' : 'font-sans'}`}>
        <h2 className="text-3xl font-bold text-center text-primary mb-6">{t('howItWorks')}</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-red-100 text-secondary rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <p className="text-gray-700">{t('step1')}</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="bg-red-100 text-secondary rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <p className="text-gray-700">{t('step2')}</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="bg-red-100 text-secondary rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <p className="text-gray-700">{t('step3')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
