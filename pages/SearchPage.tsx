
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { BLOOD_GROUPS, BANGLADESH_DISTRICTS } from '../constants';
import { mockDonors } from '../data/mockData';
import { DonorCard } from '../components/DonorCard';


export const SearchPage = () => {
  const { t, language } = useLanguage();
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const formClass = language === 'bn' ? 'font-display' : 'font-sans';

  const filteredDonors = useMemo(() => {
    return mockDonors.filter(donor => {
      const bloodGroupMatch = bloodGroupFilter ? donor.bloodGroup === bloodGroupFilter : true;
      const locationMatch = locationFilter ? donor.location === locationFilter : true;
      return bloodGroupMatch && locationMatch;
    });
  }, [bloodGroupFilter, locationFilter]);

  const handleSearch = () => {
    setLoading(true);
  setHasSearched(true);
    // Simulate API call
    setTimeout(() => {
        // The filtering is already done by useMemo, this is just to show a loading state
        setLoading(false);
    }, 500);
  }

  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 ${formClass}`}>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('searchDonors')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">{t('bloodGroup')}</label>
            <select
              id="bloodGroup"
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option value="">{t('allGroups')}</option>
              {BLOOD_GROUPS.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">{t('location')}</label>
            <select
              id="location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option value="">{t('allDistricts')}</option>
              {BANGLADESH_DISTRICTS.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors h-10"
          >
            {loading ? t('loading') : t('search')}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
            <p className="text-lg text-gray-600">{t('loading')}</p>
        </div>
      ) : !hasSearched ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <h3 className="text-lg text-gray-600">{t('startSearchHint')}</h3>
        </div>
      ) : filteredDonors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDonors.map(donor => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">{t('noDonorsFound')}</h3>
          <p className="text-gray-500 mt-2">{t('tryDifferentFilters')}</p>
        </div>
      )}
    </div>
  );
};
