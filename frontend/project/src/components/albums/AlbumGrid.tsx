import React from 'react';
import { motion } from 'framer-motion';
import { usePhotoContext } from '../../context/PhotoContext';
import AlbumCard from './AlbumCard';
import { Album } from '../../types';
import Button from '../ui/Button';
import { Plus } from 'lucide-react';

interface AlbumGridProps {
  albums: Album[];
  onCreateAlbum?: () => void;
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums, onCreateAlbum }) => {
  const { photos } = usePhotoContext();
  
  // Get cover photo for an album
  const getCoverPhoto = (album: Album) => {
    if (album.coverPhotoId) {
      return photos.find(photo => photo.id === album.coverPhotoId);
    }
    
    // If no cover photo is set, use the first photo in the album
    if (album.photoIds.length > 0) {
      return photos.find(photo => photo.id === album.photoIds[0]);
    }
    
    return undefined;
  };
  
  // Get number of photos in an album
  const getPhotoCount = (album: Album) => {
    return album.photoIds.length;
  };
  
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  return (
    <div className="w-full">
      {/* Header with title and controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-0">
          Albums <span className="text-gray-500 dark:text-gray-400 text-lg">({albums.length})</span>
        </h2>
        
        {onCreateAlbum && (
          <Button
            variant="primary"
            onClick={onCreateAlbum}
            icon={<Plus size={16} />}
          >
            Create Album
          </Button>
        )}
      </div>
      
      {/* Albums grid */}
      {albums.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {albums.map((album, index) => (
            <AlbumCard
              key={album.id}
              album={album}
              coverPhoto={getCoverPhoto(album)}
              photoCount={getPhotoCount(album)}
              index={index}
            />
          ))}
        </motion.div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            You don't have any albums yet.
          </p>
          {onCreateAlbum && (
            <Button
              variant="primary"
              onClick={onCreateAlbum}
              icon={<Plus size={16} />}
            >
              Create Your First Album
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumGrid;