import React from 'react';
import { motion } from 'framer-motion';
import ProfileSetupForm from '../components/auth/ProfileSetupForm';

const ProfileSetupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md"
      >
        <ProfileSetupForm />
      </motion.div>
    </div>
  );
};

export default ProfileSetupPage;