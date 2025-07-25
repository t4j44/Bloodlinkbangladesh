
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDonors } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { BloodDropIcon } from '../components/icons/BloodDropIcon';
import { LocationIcon } from '../components/icons/LocationIcon';

const ProfileInfoRow = ({ label, value, langClass }: { label: string; value?: string; langClass: string }) => {
    if (!value) return null;
    return (
        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className={`text-sm font-medium text-gray-500 ${langClass}`}>{label}</dt>
            <dd className={`mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ${langClass}`}>{value}</dd>
        </div>
    );
};

export const ProfilePage = () => {
    const { id } = useParams<{ id: string }>();
    const { t, language } = useLanguage();
    const donor = mockDonors.find(d => d.id === id);
    const langClass = language === 'bn' ? 'font-display' : 'font-sans';

    if (!donor) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Donor not found</h2>
                <Link to="/search" className="text-primary hover:underline">Back to search</Link>
            </div>
        );
    }
    
    return (
        <div className="bg-light py-12">
            <div className={`container mx-auto max-w-3xl px-4 ${langClass}`}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                            <div className="bg-red-100 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                                <BloodDropIcon className="h-16 w-16 text-secondary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{donor.fullName}</h1>
                                <p className="text-2xl font-semibold text-secondary">{donor.bloodGroup}</p>
                                <div className="flex items-center justify-center sm:justify-start text-gray-500 mt-2">
                                    <LocationIcon className="h-5 w-5 mr-2" />
                                    <span>{donor.location}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-200">
                            <dl className="divide-y divide-gray-200">
                                <ProfileInfoRow label={t('mobileNumber')} value={donor.mobileNumber} langClass={langClass}/>
                                <ProfileInfoRow label={t('nearestHospital')} value={donor.nearestHospital} langClass={langClass}/>
                                <ProfileInfoRow label={t('socialMediaLink')} value={donor.socialMediaLink} langClass={langClass}/>
                            </dl>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                           <a href={`tel:${donor.mobileNumber}`} className="w-full text-center bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition-colors duration-300">
                                {t('callNow')}
                            </a>
                            {donor.socialMediaLink && (
                               <a href={donor.socialMediaLink} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                    {t('socialMediaLink')}
                                </a>
                            )}
                        </div>
                        
                         <div className="mt-8 text-center">
                            <Link to="/search" className="text-primary hover:underline">
                                &larr; {t('backToSearch')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};