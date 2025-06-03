import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Photo, Album } from '../../types';

interface AlbumCardProps {
  album: Album;
  coverPhoto: Photo | undefined;
  photoCount: number;
  index: number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, coverPhoto, photoCount, index }) => {
  const navigate = useNavigate();
  
  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      className="group cursor-pointer"
      onClick={() => navigate(`/album/${album.id}`)}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-shadow duration-300">
        {coverPhoto ? (
          <img
            src={coverPhoto.thumbnail}
            alt={album.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">No photos</span>
          </div>
        )}
        
        {/* Overlay with album info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end">
          <h3 className="text-white text-lg font-medium">{album.name}</h3>
          <p className="text-white/80 text-sm mb-1">
            {photoCount} {photoCount === 1 ? 'photo' : 'photos'}
          </p>
          <p className="text-white/60 text-xs">
            Created {formatDate(album.dateCreated)}
          </p>
        </div>
      </div>
      
      {album.description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {album.description}
        </p>
      )}
    </motion.div>
  );
};

export default AlbumCard;