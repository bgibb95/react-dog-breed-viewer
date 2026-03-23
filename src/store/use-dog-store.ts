import { create } from 'zustand';
import { fetchBreedImages } from './helpers/fetch-breed-images';
import { fetchBreeds } from './helpers/fetch-breeds';

type DogStateProperties = {
  breeds: string[];
  isLoadingBreeds: boolean;
  breedsError: string | null;
  selectedBreed: string | null;
  images: string[];
  isLoadingImages: boolean;
  imagesError: string | null;
};

type DogState = DogStateProperties & {
  loadBreeds: () => Promise<void>;
  setSelectedBreed: (breed: string) => Promise<void>;
  reset: () => void;
};

const initialState = {
  breeds: [],
  isLoadingBreeds: false,
  breedsError: null,
  selectedBreed: null,
  images: [],
  isLoadingImages: false,
  imagesError: null,
} as const satisfies DogStateProperties;

export const useDogStore = create<DogState>((set, get) => ({
  ...initialState,
  loadBreeds: async () => {
    set({ isLoadingBreeds: true, breedsError: null });
    try {
      const breeds = await fetchBreeds();
      set({ breeds, isLoadingBreeds: false });
    } catch {
      set({
        breedsError: "We're having trouble loading the dog breeds right now.",
        isLoadingBreeds: false,
      });
    }
  },
  setSelectedBreed: async (breed: string) => {
    set({ selectedBreed: breed, isLoadingImages: true, imagesError: null });
    try {
      const images = await fetchBreedImages(breed);
      // Ensure the user hasn't selected another breed while these photos were loading
      if (get().selectedBreed !== breed) return;

      set({ images, isLoadingImages: false });
    } catch {
      if (get().selectedBreed !== breed) return;

      set({
        imagesError: `We couldn't load the photos for ${breed}.`,
        images: [],
        isLoadingImages: false,
      });
    }
  },
  reset: () => set(initialState),
}));
