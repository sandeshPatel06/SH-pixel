import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePhotoContext } from '../../context/PhotoContext';
import { Search, Moon, Sun, Grid, LayoutGrid, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeMode, setThemeMode, viewMode, setViewMode } = usePhotoContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Toggle theme mode
  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'masonry' : 'grid');
  };

  // Navigation items
  const navItems = [
    { name: 'Gallery', path: '/' },
    { name: 'Albums', path: '/albums' },
    { name: 'Favorites', path: '/favorites' },
    { name: 'Upload', path: '/upload' },
  ];

  // Header class based on scroll state
  const headerClasses = `fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm' 
      : 'bg-transparent'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 
            onClick={() => navigate('/')} 
            className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
          >
            PhotoFlow
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                location.pathname === item.path
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-64 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </form>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleViewMode}
            aria-label="Toggle view mode"
          >
            {viewMode === 'grid' ? <LayoutGrid size={18} /> : <Grid size={18} />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {themeMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 py-2">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </form>
            
            <nav className="flex flex-col space-y-3 pb-3">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">View:</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleViewMode}
                  aria-label="Toggle view mode"
                >
                  {viewMode === 'grid' ? <LayoutGrid size={18} /> : <Grid size={18} />}
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Theme:</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {themeMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;