import { ImageCard } from '@/components/dog-viewer/ImageCard';
import { FavouriteButton } from '@/components/favourites/FavouriteButton';
import { ErrorState } from '@/components/ui/feedback/ErrorState';
import { LoadingState } from '@/components/ui/feedback/LoadingState';
import { StarIcon } from '@/components/ui/icons/StarIcon';
import { useFavouritesStore } from '@/store/use-favourites-store';

export function MyFavouritesScreen() {
  const { favourites, isLoading, fetchError } = useFavouritesStore();

  if (isLoading && favourites.length === 0) {
    return (
      <div className="h-full bg-surface/50 rounded-2xl border border-gray-100 border-dashed flex items-center justify-center min-h-96 w-full mt-8">
        <LoadingState message="Loading your favourites..." />
      </div>
    );
  }

  if (fetchError && favourites.length === 0) {
    return (
      <div className="min-h-96 flex items-center justify-center w-full mt-8">
        <ErrorState message={fetchError} />
      </div>
    );
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      <div className="space-y-6 w-full">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold capitalize text-text">
            My <span className="text-primary font-normal">Favourites</span>
          </h2>
        </div>

        {favourites.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-12 bg-surface rounded-2xl border border-gray-100 border-dashed text-text-light min-h-96">
            <StarIcon width="48" height="48" className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No favourites yet</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {favourites.map((imageUrl) => (
              <ImageCard
                key={imageUrl}
                imageUrl={imageUrl}
                actionOverlay={<FavouriteButton imageUrl={imageUrl} />}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
