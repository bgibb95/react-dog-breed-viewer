import { apiClient } from './api-client';

type BreedsResponse = {
  message: Record<string, string[]>;
  status: string;
};

export async function fetchBreeds(): Promise<string[]> {
  const response = await apiClient<BreedsResponse>('https://dog.ceo/api/breeds/list/all');

  if (response.status !== 'success') throw new Error('API returned an error when fetching breeds');

  return Object.keys(response.message);
}
