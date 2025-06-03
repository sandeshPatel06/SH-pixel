export interface User {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  avatar?: string;
  isAdmin: boolean;
  isProfileComplete: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface OtpResponse {
  email: string;
  otpSent: boolean;
  message: string;
}

export interface ProfileSetup {
  name: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  avatar?: File;
}