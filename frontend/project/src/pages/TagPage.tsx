import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Tag as TagIcon } from 'lucide-react';
import { usePhotoContext } from '../context/PhotoContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PhotoGrid from '../components/photos/PhotoGrid';
import PhotoDetail from '../components/photos/PhotoDetail';
import Button from '../components/ui/Button';

const TagPage: React.FC = () => {
  const { tag, photoId } = useParams<{ tag: string; photoId?: string }>();
  const navigate = useNavigate();
  const { photos, getPhotosByTag } = usePhotoContext();
  
  // Get photos with this tag
  const taggedPhotos = tag ? getPhotosByTag(tag) : [];
  
  // Find selected photo if photoId is provided
  const selectedPhoto = photoId ? photos.find(photo => photo.id === photoId) : undefined;
  
  // Handle photo detail close
  const handleClosePhotoDetail = () => {
    navigate(`/tag/${tag}`);
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
  
  if (!tag) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Tag Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The tag you're looking for doesn't exist.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              icon={<ChevronLeft size={16} />}
            >
              Back to Gallery
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
        {/* Tag header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate('/')}
              className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Back to gallery"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center">
              <TagIcon size={24} className="mr-2 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {tag}
              </h1>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            Photos tagged with "{tag}"
          </p>
        </div>
        
        {/* Photos with this tag */}
        <PhotoGrid 
          photos={taggedPhotos}
          title={`Photos (${taggedPhotos.length})`}
          emptyMessage={`No photos found with the tag "${tag}"`}
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

export default TagPage;