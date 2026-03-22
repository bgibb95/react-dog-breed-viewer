import { useFavouritesStore } from '@/store/use-favourites-store';
import { useEffect } from 'react';

export function useFavouritesLoader() {
  const fetchFavourites = useFavouritesStore(({ fetchFavourites }) => fetchFavourites);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);
}
