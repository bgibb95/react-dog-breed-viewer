import { apiClient } from './api-client';
import { createMemoryCache } from './cache';

type BreedImagesResponse = {
  message: string[];
  status: string;
};

// Memory cache used instead of session cache because different images might be preferred on page refresh
const imagesCache = createMemoryCache<string[]>();

export async function fetchBreedImages(breed: string): Promise<string[]> {
  const cachedImageUrls = imagesCache.get(breed);

  if (cachedImageUrls) return cachedImageUrls;

  const response = await apiClient<BreedImagesResponse>(
    `https://dog.ceo/api/breed/${breed}/images/random/3`
  );

  if (response.status !== 'success')
    throw new Error(`API returned an error when fetching images for ${breed}`);

  const imageUrls = response.message;
  imagesCache.set(breed, imageUrls);

  return imageUrls;
}
