import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePhotoContext } from '../context/PhotoContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PhotoGrid from '../components/photos/PhotoGrid';
import PhotoDetail from '../components/photos/PhotoDetail';
import { useNavigate, useParams } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { photos } = usePhotoContext();
  const navigate = useNavigate();
  const { photoId } = useParams<{ photoId?: string }>();
  
  // Find selected photo if photoId is provided
  const selectedPhoto = photoId ? photos.find(photo => photo.id === photoId) : undefined;
  
  // Handle photo detail close
  const handleClosePhotoDetail = () => {
    navigate('/');
  };
  
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
        <PhotoGrid 
          photos={photos}
          title="Your Photos"
          emptyMessage="You don't have any photos yet. Click 'Upload' to add some!"
        />
      </motion.main>
      
      <Footer />
      
      {/* Photo detail modal */}
      {selectedPhoto && (
        <PhotoDetail
          photo={selectedPhoto}
          onClose={handleClosePhotoDetail}
        />
      )}
    </div>
  );
};

export default HomePage;