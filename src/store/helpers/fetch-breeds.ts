type BreedsResponse = {
  message: Record<string, string[]>;
  status: string;
};

export async function fetchBreeds(): Promise<string[]> {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');

  if (!response.ok) throw new Error('Failed to fetch breeds list');

  const data: BreedsResponse = await response.json();

  if (data.status !== 'success') throw new Error('API returned an error when fetching breeds');

  return Object.keys(data.message);
}
