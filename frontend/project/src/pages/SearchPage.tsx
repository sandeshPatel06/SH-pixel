import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePhotoContext } from '../context/PhotoContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PhotoGrid from '../components/photos/PhotoGrid';
import PhotoDetail from '../components/photos/PhotoDetail';
import { Search as SearchIcon } from 'lucide-react';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { photoId } = useParams<{ photoId?: string }>();
  const { photos, searchPhotos } = usePhotoContext();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  
  // Extract search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q') || '';
    setQuery(q);
    
    if (q) {
      setSearchResults(searchPhotos(q));
    } else {
      setSearchResults([]);
    }
  }, [location.search, searchPhotos]);
  
  // Find selected photo if photoId is provided
  const selectedPhoto = photoId ? photos.find(photo => photo.id === photoId) : undefined;
  
  // Handle photo detail close
  const handleClosePhotoDetail = () => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
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
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <SearchIcon size={24} className="text-gray-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Search Results
            </h1>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            {query ? (
              <>
                Showing results for <span className="font-medium">"{query}"</span>
              </>
            ) : (
              'Enter a search term to find photos'
            )}
          </p>
        </div>
        
        <PhotoGrid 
          photos={searchResults}
          title={`Search Results (${searchResults.length})`}
          emptyMessage={query ? `No photos found for "${query}"` : 'Enter a search term to find photos'}
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

export default SearchPage;