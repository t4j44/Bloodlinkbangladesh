
import React from 'react';
import { Link } from 'react-router-dom';
import { DonorProfile } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { BloodDropIcon } from './icons/BloodDropIcon';
import { LocationIcon } from './icons/LocationIcon';

interface DonorCardProps {
  donor: DonorProfile;
}

export const DonorCard = ({ donor }: DonorCardProps) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <BloodDropIcon className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <h3 className={`text-xl font-bold text-gray-800 ${language === 'bn' ? 'font-display' : 'font-sans'}`}>{donor.fullName}</h3>
            <p className="text-secondary font-semibold text-lg">{donor.bloodGroup}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-600 mb-6">
          <LocationIcon className="h-5 w-5 mr-2 text-gray-400"/>
          <span className={`${language === 'bn' ? 'font-display' : 'font-sans'}`}>{donor.location}</span>
        </div>
        <Link
          to={`/profile/${donor.id}`}
          className={`w-full block text-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300 ${language === 'bn' ? 'font-display' : 'font-sans'}`}
        >
          {t('viewProfile')}
        </Link>
      </div>
    </div>
  );
};
