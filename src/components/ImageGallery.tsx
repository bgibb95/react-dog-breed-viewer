import { useDogStore } from '../store/use-dog-store';
import { ErrorState } from './ErrorState';
import { LoadingState } from './LoadingState';

export function ImageGallery() {
  const images = useDogStore(({ images }) => images);
  const selectedBreed = useDogStore(({ selectedBreed }) => selectedBreed);
  const isLoadingImages = useDogStore(({ isLoadingImages }) => isLoadingImages);
  const imagesError = useDogStore(({ imagesError }) => imagesError);

  if (isLoadingImages) {
    return (
      <div className="h-full bg-surface/50 rounded-2xl border border-gray-100 border-dashed flex items-center justify-center min-h-96">
        <LoadingState message={`Fetching photos for ${selectedBreed}...`} />
      </div>
    );
  }

  if (imagesError) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <ErrorState message={imagesError} />
      </div>
    );
  }

  if (!selectedBreed) {
    return (
      <div className="h-full flex items-center justify-center p-12 bg-surface rounded-2xl border border-gray-100 border-dashed text-text-light">
        <p className="text-lg font-medium">Select a breed to view images</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold capitalize text-text">
          {selectedBreed} <span className="text-primary font-normal">Gallery</span>
        </h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {images.map((imageUrl) => (
          <div
            key={imageUrl}
            className="group relative break-inside-avoid mb-6 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100"
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300 pointer-events-none" />
            <img
              src={imageUrl}
              alt={`${selectedBreed} dog`}
              className="w-full h-auto block transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
