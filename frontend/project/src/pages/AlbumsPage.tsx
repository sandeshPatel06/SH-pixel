import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePhotoContext } from '../context/PhotoContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AlbumGrid from '../components/albums/AlbumGrid';
import CreateAlbumModal from '../components/albums/CreateAlbumModal';

const AlbumsPage: React.FC = () => {
  const { albums } = usePhotoContext();
  const [showCreateModal, setShowCreateModal] = useState(false);
  
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
        <AlbumGrid 
          albums={albums}
          onCreateAlbum={() => setShowCreateModal(true)}
        />
      </motion.main>
      
      <Footer />
      
      {/* Create album modal */}
      {showCreateModal && (
        <CreateAlbumModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default AlbumsPage;