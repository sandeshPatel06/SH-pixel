import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePhotoContext } from '../../context/PhotoContext';
import PhotoCard from './PhotoCard';
import { Photo } from '../../types';
import { Grid, SortAsc, SortDesc } from 'lucide-react';
import Button from '../ui/Button';

interface PhotoGridProps {
  photos: Photo[];
  title?: string;
  emptyMessage?: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ 
  photos, 
  title = 'Photos', 
  emptyMessage = 'No photos found.' 
}) => {
  const { viewMode, currentSort, setSortOption } = usePhotoContext();
  const [sortedPhotos, setSortedPhotos] = useState<Photo[]>([]);
  
  // Apply sorting whenever photos or sort option changes
  useEffect(() => {
    const sorted = [...photos].sort((a, b) => {
      switch (currentSort) {
        case 'newest':
          return new Date(b.dateUploaded).getTime() - new Date(a.dateUploaded).getTime();
        case 'oldest':
          return new Date(a.dateUploaded).getTime() - new Date(b.dateUploaded).getTime();
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    setSortedPhotos(sorted);
  }, [photos, currentSort]);
  
  // Toggle sort between newest and oldest
  const toggleDateSort = () => {
    setSortOption(currentSort === 'newest' ? 'oldest' : 'newest');
  };
  
  // Set sort to name
  const sortByName = () => {
    setSortOption('name');
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
          {title} {photos.length > 0 && <span className="text-gray-500 dark:text-gray-400 text-lg">({photos.length})</span>}
        </h2>
        
        {photos.length > 0 && (
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleDateSort}
              icon={currentSort === 'newest' ? <SortDesc size={16} /> : <SortAsc size={16} />}
            >
              {currentSort === 'newest' ? 'Newest' : 'Oldest'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={sortByName}
              icon={<Grid size={16} />}
              className={currentSort === 'name' ? 'bg-gray-100 dark:bg-gray-800' : ''}
            >
              Name
            </Button>
          </div>
        )}
      </div>
      
      {/* Photos grid */}
      {sortedPhotos.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-4 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              : 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 space-y-4'
          }`}
        >
          {sortedPhotos.map((photo, index) => (
            <div key={photo.id} className={viewMode === 'masonry' ? 'break-inside-avoid' : ''}>
              <PhotoCard photo={photo} index={index} />
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;