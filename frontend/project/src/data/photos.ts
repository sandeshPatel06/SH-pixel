import { Photo, Album } from '../types';

// Sample photos data for initial state
export const samplePhotos: Photo[] = [
  {
    id: '1',
    src: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    thumbnail: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Beautiful mountain landscape',
    title: 'Mountain View',
    description: 'Scenic mountain landscape at sunset',
    dateUploaded: new Date('2024-01-15'),
    dateTaken: new Date('2023-12-28'),
    tags: ['landscape', 'mountains', 'sunset'],
    favorite: true,
    metadata: {
      camera: 'Canon EOS 5D Mark IV',
      lens: '24-70mm f/2.8L',
      focalLength: '35mm',
      aperture: 'f/8',
      shutterSpeed: '1/125s',
      iso: 100,
      dimensions: {
        width: 5760,
        height: 3840
      },
      location: {
        name: 'Rocky Mountains'
      }
    }
  },
  {
    id: '2',
    src: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    thumbnail: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Ocean waves crashing on shore',
    title: 'Ocean Waves',
    description: 'Waves crashing on the rocky shoreline',
    dateUploaded: new Date('2024-02-03'),
    dateTaken: new Date('2024-01-25'),
    tags: ['ocean', 'water', 'nature'],
    album: 'Nature',
    favorite: false,
    metadata: {
      camera: 'Nikon Z7',
      lens: '14-24mm f/2.8',
      focalLength: '18mm',
      aperture: 'f/11',
      shutterSpeed: '1/250s',
      iso: 64,
      dimensions: {
        width: 8256,
        height: 5504
      }
    }
  },
  {
    id: '3',
    src: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    thumbnail: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Urban cityscape at night',
    title: 'City Lights',
    description: 'Downtown skyline illuminated at night',
    dateUploaded: new Date('2024-03-10'),
    dateTaken: new Date('2024-02-28'),
    tags: ['city', 'night', 'urban', 'architecture'],
    album: 'Urban',
    favorite: true,
    metadata: {
      camera: 'Sony A7R IV',
      lens: '16-35mm f/2.8 GM',
      focalLength: '24mm',
      aperture: 'f/5.6',
      shutterSpeed: '4s',
      iso: 100,
      dimensions: {
        width: 9504,
        height: 6336
      },
      location: {
        name: 'New York City'
      }
    }
  },
  {
    id: '4',
    src: 'https://images.pexels.com/photos/1181181/pexels-photo-1181181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    thumbnail: 'https://images.pexels.com/photos/1181181/pexels-photo-1181181.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Coffee shop ambiance',
    title: 'Coffee Break',
    description: 'A warm cup of coffee on a wooden table',
    dateUploaded: new Date('2024-03-15'),
    dateTaken: new Date('2024-03-02'),
    tags: ['coffee', 'lifestyle', 'indoor'],
    album: 'Lifestyle',
    favorite: false,
    metadata: {
      camera: 'Fujifilm X-T4',
      lens: '23mm f/1.4',
      focalLength: '23mm',
      aperture: 'f/2',
      shutterSpeed: '1/60s',
      iso: 400,
      dimensions: {
        width: 6240,
        height: 4160
      }
    }
  },
  {
    id: '5',
    src: 'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    thumbnail: 'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Winter forest scene',
    title: 'Winter Wonderland',
    description: 'Snow-covered trees in a serene forest',
    dateUploaded: new Date('2024-01-05'),
    dateTaken: new Date('2023-12-20'),
    tags: ['winter', 'snow', 'forest', 'nature'],
    album: 'Nature',
    favorite: true,
    metadata: {
      camera: 'Canon EOS R5',
      lens: '70-200mm f/2.8L',
      focalLength: '120mm',
      aperture: 'f/4',
      shutterSpeed: '1/250s',
      iso: 200,
      dimensions: {
        width: 8192,
        height: 5464
      },
      location: {
        name: 'Vermont'
      }
    }
  },
  {
    id: '6',
    src: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    thumbnail: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Portrait of a woman',
    title: 'Golden Hour Portrait',
    description: 'Portrait of a woman during golden hour',
    dateUploaded: new Date('2024-02-20'),
    dateTaken: new Date('2024-02-10'),
    tags: ['portrait', 'people', 'golden hour'],
    album: 'Portraits',
    favorite: false,
    metadata: {
      camera: 'Sony A7 III',
      lens: '85mm f/1.4 GM',
      focalLength: '85mm',
      aperture: 'f/1.8',
      shutterSpeed: '1/400s',
      iso: 100,
      dimensions: {
        width: 6000,
        height: 4000
      }
    }
  }
];

// Sample albums data for initial state
export const sampleAlbums: Album[] = [
  {
    id: '1',
    name: 'Nature',
    description: 'Beautiful landscapes and natural scenery',
    coverPhotoId: '1',
    dateCreated: new Date('2024-01-10'),
    photoIds: ['1', '2', '5']
  },
  {
    id: '2',
    name: 'Urban',
    description: 'City life and architecture',
    coverPhotoId: '3',
    dateCreated: new Date('2024-02-15'),
    photoIds: ['3']
  },
  {
    id: '3',
    name: 'Lifestyle',
    description: 'Daily moments and lifestyle photography',
    coverPhotoId: '4',
    dateCreated: new Date('2024-03-05'),
    photoIds: ['4']
  },
  {
    id: '4',
    name: 'Portraits',
    description: 'People and portrait photography',
    coverPhotoId: '6',
    dateCreated: new Date('2024-02-10'),
    photoIds: ['6']
  }
];