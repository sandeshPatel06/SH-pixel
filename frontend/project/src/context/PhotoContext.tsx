import React, { createContext, useContext, useState, useEffect } from 'react';
import { Photo, Album, ViewMode, ThemeMode, SortOption } from '../types';
import { samplePhotos, sampleAlbums } from '../data/photos';

interface PhotoContextType {
  photos: Photo[];
  albums: Album[];
  viewMode: ViewMode;
  themeMode: ThemeMode;
  currentSort: SortOption;
  setViewMode: (mode: ViewMode) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setSortOption: (option: SortOption) => void;
  addPhoto: (photo: Photo) => void;
  removePhoto: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addAlbum: (album: Album) => void;
  removeAlbum: (id: string) => void;
  addPhotoToAlbum: (photoId: string, albumId: string) => void;
  removePhotoFromAlbum: (photoId: string, albumId: string) => void;
  getPhotosByAlbum: (albumId: string) => Photo[];
  getFavoritePhotos: () => Photo[];
  getPhotosByTag: (tag: string) => Photo[];
  searchPhotos: (query: string) => Photo[];
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotoContext must be used within a PhotoProvider');
  }
  return context;
};

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);
  const [albums, setAlbums] = useState<Album[]>(sampleAlbums);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [currentSort, setSortOption] = useState<SortOption>('newest');

  // Apply theme mode to document
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  // Add a new photo
  const addPhoto = (photo: Photo) => {
    setPhotos(prev => [...prev, photo]);
  };

  // Remove a photo
  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
    
    // Also remove from any albums
    setAlbums(prev => 
      prev.map(album => ({
        ...album,
        photoIds: album.photoIds.filter(photoId => photoId !== id)
      }))
    );
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setPhotos(prev => 
      prev.map(photo => 
        photo.id === id ? { ...photo, favorite: !photo.favorite } : photo
      )
    );
  };

  // Add a new album
  const addAlbum = (album: Album) => {
    setAlbums(prev => [...prev, album]);
  };

  // Remove an album
  const removeAlbum = (id: string) => {
    setAlbums(prev => prev.filter(album => album.id !== id));
  };

  // Add a photo to an album
  const addPhotoToAlbum = (photoId: string, albumId: string) => {
    setAlbums(prev => 
      prev.map(album => 
        album.id === albumId && !album.photoIds.includes(photoId)
          ? { ...album, photoIds: [...album.photoIds, photoId] }
          : album
      )
    );
  };

  // Remove a photo from an album
  const removePhotoFromAlbum = (photoId: string, albumId: string) => {
    setAlbums(prev => 
      prev.map(album => 
        album.id === albumId
          ? { ...album, photoIds: album.photoIds.filter(id => id !== photoId) }
          : album
      )
    );
  };

  // Get photos by album
  const getPhotosByAlbum = (albumId: string): Photo[] => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return [];
    return photos.filter(photo => album.photoIds.includes(photo.id));
  };

  // Get favorite photos
  const getFavoritePhotos = (): Photo[] => {
    return photos.filter(photo => photo.favorite);
  };

  // Get photos by tag
  const getPhotosByTag = (tag: string): Photo[] => {
    return photos.filter(photo => photo.tags.includes(tag));
  };

  // Search photos by title, description, or tags
  const searchPhotos = (query: string): Photo[] => {
    const lowerQuery = query.toLowerCase();
    return photos.filter(photo => 
      photo.title.toLowerCase().includes(lowerQuery) ||
      (photo.description && photo.description.toLowerCase().includes(lowerQuery)) ||
      photo.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  const value = {
    photos,
    albums,
    viewMode,
    themeMode,
    currentSort,
    setViewMode,
    setThemeMode,
    setSortOption,
    addPhoto,
    removePhoto,
    toggleFavorite,
    addAlbum,
    removeAlbum,
    addPhotoToAlbum,
    removePhotoFromAlbum,
    getPhotosByAlbum,
    getFavoritePhotos,
    getPhotosByTag,
    searchPhotos
  };

  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  );
};