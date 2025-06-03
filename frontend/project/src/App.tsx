import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PhotoProvider } from './context/PhotoContext';
import PrivateRoute from './components/layout/PrivateRoute';

// Pages
import LoginPage from './pages/LoginPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import HomePage from './pages/HomePage';
import AlbumsPage from './pages/AlbumsPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import UploadPage from './pages/UploadPage';
import TagPage from './pages/TagPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PhotoProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/setup-profile" element={<ProfileSetupPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/photo/:photoId" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            
            <Route path="/albums" element={<PrivateRoute><AlbumsPage /></PrivateRoute>} />
            <Route path="/album/:albumId" element={<PrivateRoute><AlbumDetailPage /></PrivateRoute>} />
            <Route path="/album/:albumId/photo/:photoId" element={<PrivateRoute><AlbumDetailPage /></PrivateRoute>} />
            
            <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
            <Route path="/favorites/photo/:photoId" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
            
            <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
            <Route path="/search/photo/:photoId" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
            
            <Route path="/upload" element={<PrivateRoute requireAdmin={true}><UploadPage /></PrivateRoute>} />
            
            <Route path="/tag/:tag" element={<PrivateRoute><TagPage /></PrivateRoute>} />
            <Route path="/tag/:tag/photo/:photoId" element={<PrivateRoute><TagPage /></PrivateRoute>} />
            
            {/* Fallback to home */}
            <Route path="*" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          </Routes>
        </Router>
      </PhotoProvider>
    </QueryClientProvider>
  );
}

export default App;