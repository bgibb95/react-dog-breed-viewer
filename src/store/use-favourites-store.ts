import { create } from 'zustand';
import { apiClient } from './helpers/api-client';

type Favourites = string[];

type FavouritesState = {
  favourites: Favourites;
  isLoading: boolean;
  fetchError: string | null;
  actionError: string | null;
  lastActionedUrl: string | null;
  fetchFavourites: () => Promise<void>;
  addFavourite: (imageUrl: string) => Promise<void>;
  removeFavourite: (imageUrl: string) => Promise<void>;
};

export const useFavouritesStore = create<FavouritesState>((set) => ({
  favourites: [],
  isLoading: false,
  fetchError: null,
  actionError: null,
  lastActionedUrl: null,
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
  addFavourite: async (imageUrl: string) => {
    set({ isLoading: true, actionError: null, lastActionedUrl: imageUrl });
    try {
      const response = await apiClient<{ favourites: Favourites }>('/api/favourites', {
        method: 'POST',
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
      set({
        actionError: "We couldn't add this image to your favourites. Please try again later.",
        isLoading: false,
      });
    }
  },
  removeFavourite: async (imageUrl: string) => {
    set({ isLoading: true, actionError: null, lastActionedUrl: imageUrl });
    try {
      const response = await apiClient<{ favourites: Favourites }>('/api/favourites', {
        method: 'DELETE',
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
      set({
        actionError: "We couldn't remove this image from your favourites. Please try again later.",
        isLoading: false,
      });
    }
  },
}));
