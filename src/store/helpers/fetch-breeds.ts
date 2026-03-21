import { apiClient } from './api-client';
import { createSessionCache } from './cache';

type BreedsResponse = {
  message: Record<string, string[]>;
  status: string;
};

const breedsCacheKey = 'all';

// Session cache used so that breeds are not fetched on every page refresh
const breedsCache = createSessionCache<string[]>('breeds');

export async function fetchBreeds(): Promise<string[]> {
  const cachedBreeds = breedsCache.get(breedsCacheKey);

  if (cachedBreeds) return cachedBreeds;

  const response = await apiClient<BreedsResponse>('https://dog.ceo/api/breeds/list/all');

  if (response.status !== 'success') throw new Error('API returned an error when fetching breeds');

  const breeds = Object.keys(response.message);
  breedsCache.set(breedsCacheKey, breeds);

  return breeds;
}
