import { create } from 'zustand';
import { apiClient } from './helpers/api-client';

type Favourites = string[];

type FavouritesStateProperties = {
  favourites: Favourites;
  isLoading: boolean;
  fetchError: string | null;
  actionError: string | null;
  lastActionedUrl: string | null;
};

type FavouritesState = FavouritesStateProperties & {
  fetchFavourites: () => Promise<void>;
  addFavourite: (imageUrl: string) => Promise<void>;
  removeFavourite: (imageUrl: string) => Promise<void>;
  reset: () => void;
};

const initialState = {
  favourites: [],
  isLoading: false,
  fetchError: null,
  actionError: null,
  lastActionedUrl: null,
} as const satisfies FavouritesStateProperties;

async function toggleFavourite(
  set: (state: Partial<FavouritesState>) => void,
  imageUrl: string,
  method: 'POST' | 'DELETE',
  errorMessage: string,
) {
  set({ isLoading: true, actionError: null, lastActionedUrl: imageUrl });
  try {
    const response = await apiClient<{ favourites: Favourites }>('/api/favourites', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl }),
    });
    set({
      favourites: response.favourites,
      isLoading: false,
      actionError: null,
      lastActionedUrl: null,
    });
  } catch {
    set({ actionError: errorMessage, isLoading: false });
  }
}

export const useFavouritesStore = create<FavouritesState>((set) => ({
  ...initialState,
  fetchFavourites: async () => {
    set({ isLoading: true, fetchError: null, lastActionedUrl: null });
    try {
      const favourites = await apiClient<Favourites>('/api/favourites');
      set({ favourites, isLoading: false });
    } catch {
      set({
        fetchError: "We're having trouble loading your favourites.",
        isLoading: false,
      });
    }
  },
  addFavourite: (imageUrl) =>
    toggleFavourite(
      set,
      imageUrl,
      'POST',
      "We couldn't add this image to your favourites. Please try again later.",
    ),
  removeFavourite: (imageUrl) =>
    toggleFavourite(
      set,
      imageUrl,
      'DELETE',
      "We couldn't remove this image from your favourites. Please try again later.",
    ),
  reset: () => set(initialState),
}));
