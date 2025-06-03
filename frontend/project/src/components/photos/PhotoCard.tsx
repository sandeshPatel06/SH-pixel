import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Info } from 'lucide-react';
import { Photo } from '../../types';
import { usePhotoContext } from '../../context/PhotoContext';
import Badge from '../ui/Badge';

interface PhotoCardProps {
  photo: Photo;
  index: number;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, index }) => {
  const navigate = useNavigate();
  const { toggleFavorite } = usePhotoContext();

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
      layoutId={`photo-${photo.id}`}
      className="group relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => navigate(`/photo/${photo.id}`)}>
        <img
          src={photo.thumbnail}
          alt={photo.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-medium truncate">{photo.title}</h3>
          {photo.dateTaken && (
            <p className="text-white/80 text-xs">
              {formatDate(photo.dateTaken)}
            </p>
          )}
        </div>
      </div>
      
      {/* Actions bar */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {photo.tags.slice(0, 2).map(tag => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs"
              onClick={() => navigate(`/tag/${tag}`)}
            >
              {tag}
            </Badge>
          ))}
          {photo.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{photo.tags.length - 2}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/photo/${photo.id}`)}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            aria-label="View details"
          >
            <Info size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(photo.id);
            }}
            className={`p-1 rounded-full transition-colors ${
              photo.favorite
                ? 'text-red-500 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
            }`}
            aria-label={photo.favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={16} fill={photo.favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoCard;