import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  X, Heart, Download, Share, Tag, MapPin, Calendar, Camera, 
  Image as ImageIcon, Clock, Aperture, Sliders 
} from 'lucide-react';
import { Photo } from '../../types';
import { usePhotoContext } from '../../context/PhotoContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface PhotoDetailProps {
  photo: Photo;
  onClose: () => void;
}

const PhotoDetail: React.FC<PhotoDetailProps> = ({ photo, onClose }) => {
  const navigate = useNavigate();
  const { toggleFavorite, albums, addPhotoToAlbum } = usePhotoContext();
  
  // Format date to readable string
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, delay: 0.1 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 md:p-8"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        variants={contentVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        {/* Photo */}
        <div className="flex-1 md:w-2/3 relative bg-gray-100 dark:bg-gray-800">
          <div className="w-full h-full flex items-center justify-center p-4">
            <img 
              src={photo.src} 
              alt={photo.alt} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        
        {/* Info sidebar */}
        <div className="flex-none md:w-1/3 p-6 overflow-y-auto flex flex-col h-[50vh] md:h-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {photo.title}
          </h2>
          
          {photo.description && (
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {photo.description}
            </p>
          )}
          
          {/* Actions */}
          <div className="flex items-center space-x-2 mb-6">
            <Button
              onClick={() => toggleFavorite(photo.id)}
              variant={photo.favorite ? 'primary' : 'outline'}
              icon={<Heart size={16} fill={photo.favorite ? 'white' : 'none'} />}
            >
              {photo.favorite ? 'Favorited' : 'Favorite'}
            </Button>
            
            <Button
              variant="outline"
              icon={<Download size={16} />}
            >
              Download
            </Button>
            
            <Button
              variant="ghost"
              icon={<Share size={16} />}
            >
              Share
            </Button>
          </div>
          
          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
              <Tag size={14} className="mr-1" /> Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {photo.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  onClick={() => navigate(`/tag/${tag}`)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Details */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Details
            </h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="col-span-2">
                <dt className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Calendar size={12} className="mr-1" /> Date Taken
                </dt>
                <dd className="text-sm text-gray-900 dark:text-gray-100">
                  {formatDate(photo.dateTaken)}
                </dd>
              </div>
              
              <div className="col-span-2">
                <dt className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <MapPin size={12} className="mr-1" /> Location
                </dt>
                <dd className="text-sm text-gray-900 dark:text-gray-100">
                  {photo.metadata?.location?.name || 'Unknown'}
                </dd>
              </div>
              
              {photo.metadata?.camera && (
                <div className="col-span-2">
                  <dt className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Camera size={12} className="mr-1" /> Camera
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-100">
                    {photo.metadata.camera}
                  </dd>
                </div>
              )}
              
              {photo.metadata?.dimensions && (
                <div>
                  <dt className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <ImageIcon size={12} className="mr-1" /> Dimensions
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-100">
                    {photo.metadata.dimensions.width} x {photo.metadata.dimensions.height}
                  </dd>
                </div>
              )}
              
              {photo.metadata?.focalLength && (
                <div>
                  <dt className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Sliders size={12} className="mr-1" /> Focal Length
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-100">
                    {photo.metadata.focalLength}
                  </dd>
                </div>
              )}
              
              {photo.metadata?.aperture && (
                <div>
                  <dt className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Aperture size={12} className="mr-1" /> Aperture
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-100">
                    {photo.metadata.aperture}
                  </dd>
                </div>
              )}
              
              {photo.metadata?.shutterSpeed && (
                <div>
                  <dt className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock size={12} className="mr-1" /> Shutter Speed
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-100">
                    {photo.metadata.shutterSpeed}
                  </dd>
                </div>
              )}
              
              {photo.metadata?.iso && (
                <div>
                  <dt className="text-xs text-gray-500 dark:text-gray-400">ISO</dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-100">
                    {photo.metadata.iso}
                  </dd>
                </div>
              )}
            </dl>
          </div>
          
          {/* Albums */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Add to Album
            </h3>
            <select 
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              onChange={(e) => {
                if (e.target.value) {
                  addPhotoToAlbum(photo.id, e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>Select an album</option>
              {albums.map(album => (
                <option key={album.id} value={album.id}>
                  {album.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoDetail;