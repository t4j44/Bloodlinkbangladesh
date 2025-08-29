
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
  photo?: FileList;
};

export const RegistrationPage = () => {
  const { t, language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('../src/config/firebase');
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const { storage } = await import('../src/config/firebase');

      let photoUrl = undefined;
      if (data.photo && data.photo.length > 0) {
        const file = data.photo[0];
        const storageRef = ref(storage, `donor_photos/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        photoUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'donors'), {
        fullName: data.fullName,
        bloodGroup: data.bloodGroup,
        mobileNumber: data.mobileNumber,
        location: data.location,
        nearestHospital: data.nearestHospital || null,
        socialMediaLink: data.socialMediaLink || null,
        photoUrl: photoUrl || null,
        createdAt: new Date().toISOString(),
        status: 'active'
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error adding donor:', error);
      alert(t('errorSubmitting'));
    }
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
      <div className="card">
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
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">{t('photo')}</label>
            <input id="photo" type="file" accept="image/*" {...register('photo')} className="mt-1" />
          </div>

          <div>
            <button
                type="submit"
                className="w-full flex justify-center btn btn-secondary text-lg"
              >
                {t('submitRegistration')}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};
