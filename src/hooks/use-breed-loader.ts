import { useDogStore } from '@/store/use-dog-store';
import { useEffect } from 'react';

export function useBreedLoader() {
  const loadBreeds = useDogStore(({ loadBreeds }) => loadBreeds);

  useEffect(() => {
    loadBreeds();
  }, [loadBreeds]);

  return { loadBreeds };
}
