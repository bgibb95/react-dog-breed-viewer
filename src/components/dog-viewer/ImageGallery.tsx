import { ErrorState } from '@/components/ui/feedback/ErrorState';
import { LoadingState } from '@/components/ui/feedback/LoadingState';
import { useDogStore } from '@/store/use-dog-store';
import type { ReactNode } from 'react';
import { ImageCard } from './ImageCard';

type Props = {
  actionOverlay?: (imageUrl: string) => ReactNode;
};

export function ImageGallery({ actionOverlay }: Props) {
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
          <ImageCard
            key={imageUrl}
            imageUrl={imageUrl}
            selectedBreed={selectedBreed}
            actionOverlay={actionOverlay?.(imageUrl)}
          />
        ))}
      </div>
    </div>
  );
}
