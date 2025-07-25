
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLanguage } from '../hooks/useLanguage';
import { BloodGroup } from '../types';
import { BLOOD_GROUPS, BANGLADESH_DISTRICTS } from '../constants';
import { BloodDropIcon } from '../components/icons/BloodDropIcon';

type FormInputs = {
  fullName: string;
  bloodGroup: BloodGroup;
  mobileNumber: string;
  location: string;
  nearestHospital?: string;
  socialMediaLink?: string;
};

export const RegistrationPage = () => {
  const { t, language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('Form data submitted:', data);
    // Here you would typically send the data to a backend (e.g., Firebase)
    // For this prototype, we'll just show a success message.
    setIsSubmitted(true);
  };
  
  const formClass = language === 'bn' ? 'font-display' : 'font-sans';

  if (isSubmitted) {
    return (
      <div className="container mx-auto max-w-lg text-center py-20 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className={`text-2xl font-bold text-primary mb-4 ${formClass}`}>{t('registrationSuccess')}</h2>
          <p className={`text-gray-700 ${formClass}`}>{t('thankYouDonor')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto max-w-2xl py-10 px-4 ${formClass}`}>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
            <BloodDropIcon className="h-16 w-16 text-secondary mx-auto mb-2" />
            <h1 className="text-3xl font-bold text-primary">{t('registerAsDonor')}</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{t('fullName')}</label>
            <input
              id="fullName"
              type="text"
              {...register('fullName', { required: t('requiredField') })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">{t('bloodGroup')}</label>
              <select
                id="bloodGroup"
                {...register('bloodGroup', { required: t('requiredField') })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="">{t('selectBloodGroup')}</option>
                {BLOOD_GROUPS.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              {errors.bloodGroup && <p className="mt-1 text-sm text-red-600">{errors.bloodGroup.message}</p>}
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">{t('location')}</label>
              <select
                id="location"
                {...register('location', { required: t('requiredField') })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="">{t('selectLocation')}</option>
                {BANGLADESH_DISTRICTS.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">{t('mobileNumber')}</label>
            <input
              id="mobileNumber"
              type="tel"
              {...register('mobileNumber', { 
                  required: t('requiredField'),
                  pattern: {
                      value: /^01[3-9]\d{8}$/,
                      message: t('invalidPhone')
                  }
               })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
            {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>}
          </div>

          <div>
            <label htmlFor="nearestHospital" className="block text-sm font-medium text-gray-700">{t('nearestHospital')}</label>
            <input
              id="nearestHospital"
              type="text"
              {...register('nearestHospital')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="socialMediaLink" className="block text-sm font-medium text-gray-700">{t('socialMediaLink')}</label>
            <input
              id="socialMediaLink"
              type="url"
              {...register('socialMediaLink', {
                  pattern: {
                      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                      message: t('invalidUrl')
                  }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
            />
            {errors.socialMediaLink && <p className="mt-1 text-sm text-red-600">{errors.socialMediaLink.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-secondary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              {t('submitRegistration')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
