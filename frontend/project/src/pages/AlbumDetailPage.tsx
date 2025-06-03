import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';
import { usePhotoContext } from '../context/PhotoContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PhotoGrid from '../components/photos/PhotoGrid';
import PhotoDetail from '../components/photos/PhotoDetail';
import Button from '../components/ui/Button';

const AlbumDetailPage: React.FC = () => {
  const { albumId, photoId } = useParams<{ albumId: string; photoId?: string }>();
  const navigate = useNavigate();
  const { albums, photos, getPhotosByAlbum, removeAlbum } = usePhotoContext();
  
  // Find the album
  const album = albums.find(a => a.id === albumId);
  
  // Get photos in this album
  const albumPhotos = album ? getPhotosByAlbum(album.id) : [];
  
  // Find selected photo if photoId is provided
  const selectedPhoto = photoId ? photos.find(photo => photo.id === photoId) : undefined;
  
  // Handle photo detail close
  const handleClosePhotoDetail = () => {
    navigate(`/album/${albumId}`);
  };
  
  // Handle album deletion
  const handleDeleteAlbum = () => {
    if (confirm('Are you sure you want to delete this album? The photos will not be deleted.')) {
      if (albumId) {
        removeAlbum(albumId);
        navigate('/albums');
      }
    }
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
  
  if (!album) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Album Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The album you're looking for doesn't exist or has been deleted.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/albums')}
              icon={<ChevronLeft size={16} />}
            >
              Back to Albums
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
        {/* Album header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <button
              onClick={() => navigate('/albums')}
              className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Back to albums"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {album.name}
            </h1>
          </div>
          
          {album.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {album.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Created on {new Date(album.dateCreated).toLocaleDateString()}
            </p>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                icon={<Edit size={16} />}
                onClick={() => alert('Edit functionality would go here')}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<Trash2 size={16} />}
                onClick={handleDeleteAlbum}
                className="text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        
        {/* Photos in this album */}
        <PhotoGrid 
          photos={albumPhotos}
          title="Photos"
          emptyMessage="This album is empty. Add photos to this album from the photo details view."
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

export default AlbumDetailPage;