export enum UserRole {
  Donor = 'DONOR',
  Seeker = 'SEEKER',
}

export enum BloodGroup {
  APositive = 'A+',
  ANegative = 'A-',
  BPositive = 'B+',
  BNegative = 'B-',
  ABPositive = 'AB+',
  ABNegative = 'AB-',
  OPositive = 'O+',
  ONegative = 'O-',
}

export interface DonorProfile {
  id: string;
  fullName: string;
  bloodGroup: BloodGroup;
  mobileNumber: string;
  location: string; // District
  nearestHospital?: string;
  socialMediaLink?: string;
  lastDonationDate?: string; 
}
