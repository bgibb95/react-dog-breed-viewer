type BreedImagesResponse = {
  message: string[];
  status: string;
};

export async function fetchBreedImages(breed: string): Promise<string[]> {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`);

  if (!response.ok) throw new Error(`Failed to fetch images for breed: ${breed}`);

  const data: BreedImagesResponse = await response.json();

  if (data.status !== 'success')
    throw new Error(`API returned an error when fetching images for ${breed}`);

  return data.message;
}
