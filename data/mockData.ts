
import { DonorProfile, BloodGroup } from '../types';
import { BANGLADESH_DISTRICTS } from '../constants';

const sampleNames = [
    "Rahim Ali", "Karim Sheikh", "Fatima Begum", "Jahanara Khatun", "Abdullah Al Mamun", "Sultana Razia", "Mostafa Kamal", "Nasrin Akter", "Imran Hossain", "Ayesha Siddika"
];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const mockDonors: DonorProfile[] = Array.from({ length: 150 }, (_, i) => ({
    id: `donor-${i + 1}`,
    fullName: getRandomElement(sampleNames),
    bloodGroup: getRandomElement(Object.values(BloodGroup)),
    mobileNumber: `017${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
    location: getRandomElement(BANGLADESH_DISTRICTS),
    nearestHospital: `Hospital ${String.fromCharCode(65 + (i % 10))}`,
    socialMediaLink: `https://facebook.com/profile.php?id=${1000000000 + i}`,
    lastDonationDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365).toISOString().split('T')[0]
}));
