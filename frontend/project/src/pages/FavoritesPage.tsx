import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { usePhotoContext } from '../context/PhotoContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PhotoGrid from '../components/photos/PhotoGrid';
import PhotoDetail from '../components/photos/PhotoDetail';

const FavoritesPage: React.FC = () => {
  const { photoId } = useParams<{ photoId?: string }>();
  const navigate = useNavigate();
  const { photos, getFavoritePhotos } = usePhotoContext();
  
  // Get favorite photos
  const favoritePhotos = getFavoritePhotos();
  
  // Find selected photo if photoId is provided
  const selectedPhoto = photoId ? photos.find(photo => photo.id === photoId) : undefined;
  
  // Handle photo detail close
  const handleClosePhotoDetail = () => {
    navigate('/favorites');
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
          photos={favoritePhotos}
          title="Favorite Photos"
          emptyMessage="You haven't favorited any photos yet. Click the heart icon on a photo to add it to your favorites."
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

export default FavoritesPage;