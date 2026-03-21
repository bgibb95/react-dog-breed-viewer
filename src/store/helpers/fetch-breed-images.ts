import { apiClient } from './api-client';

type BreedImagesResponse = {
  message: string[];
  status: string;
};

export async function fetchBreedImages(breed: string): Promise<string[]> {
  const response = await apiClient<BreedImagesResponse>(
    `https://dog.ceo/api/breed/${breed}/images/random/3`
  );

  if (response.status !== 'success')
    throw new Error(`API returned an error when fetching images for ${breed}`);

  return response.message;
}
