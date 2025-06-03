import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import UploadForm from '../components/photos/UploadForm';

const UploadPage: React.FC = () => {
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <motion.main 
        className="flex-grow container mx-auto px-4 py-24"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Upload Photos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add new photos to your collection. Supported formats: JPG, PNG, GIF.
          </p>
        </div>
        
        <UploadForm />
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default UploadPage;