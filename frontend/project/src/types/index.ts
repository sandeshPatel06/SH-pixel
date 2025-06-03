export interface Photo {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  title: string;
  description?: string;
  dateUploaded: Date;
  dateTaken?: Date;
  tags: string[];
  album?: string;
  favorite: boolean;
  metadata?: PhotoMetadata;
}

export interface PhotoMetadata {
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  location?: {
    latitude?: number;
    longitude?: number;
    name?: string;
  };
}

export interface Album {
  id: string;
  name: string;
  description?: string;
  coverPhotoId?: string;
  dateCreated: Date;
  photoIds: string[];
}

export type ViewMode = 'grid' | 'masonry';
export type ThemeMode = 'light' | 'dark';
export type SortOption = 'newest' | 'oldest' | 'name' | 'dateUploaded';