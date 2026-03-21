import { create } from 'zustand';
import { fetchBreedImages } from './helpers/fetch-breed-images';
import { fetchBreeds } from './helpers/fetch-breeds';

type DogState = {
  breeds: string[];
  isLoadingBreeds: boolean;
  breedsError: string | null;
  selectedBreed: string | null;
  images: string[];
  isLoadingImages: boolean;
  imagesError: string | null;
  loadBreeds: () => Promise<void>;
  setSelectedBreed: (breed: string) => Promise<void>;
};

export const useDogStore = create<DogState>((set, get) => ({
  breeds: [],
  isLoadingBreeds: false,
  breedsError: null,
  selectedBreed: null,
  images: [],
  isLoadingImages: false,
  imagesError: null,
  loadBreeds: async () => {
    set({ isLoadingBreeds: true, breedsError: null });
    try {
      const breeds = await fetchBreeds();
      set({ breeds, isLoadingBreeds: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred while fetching breeds.';
      set({ breedsError: errorMessage, isLoadingBreeds: false });
    }
  },
  setSelectedBreed: async (breed: string) => {
    set({ selectedBreed: breed, isLoadingImages: true, imagesError: null });
    try {
      const images = await fetchBreedImages(breed);
      // Ensure the user hasn't selected another breed while these photos were loading
      if (get().selectedBreed !== breed) return;

      set({ images, isLoadingImages: false });
    } catch (error: unknown) {
      if (get().selectedBreed !== breed) return;

      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred while fetching images.';
      set({ imagesError: errorMessage, images: [], isLoadingImages: false });
    }
  },
}));
