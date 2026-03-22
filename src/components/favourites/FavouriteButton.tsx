import { ErrorIcon } from '@/components/ui/icons/ErrorIcon';
import { SpinnerIcon } from '@/components/ui/icons/SpinnerIcon';
import { StarIcon } from '@/components/ui/icons/StarIcon';
import { useFavouritesStore } from '@/store/use-favourites-store';

type Props = {
  imageUrl: string;
};

export function FavouriteButton({ imageUrl }: Props) {
  const favourites = useFavouritesStore(({ favourites }) => favourites);
  const isLoading = useFavouritesStore(({ isLoading }) => isLoading);
  const actionError = useFavouritesStore(({ actionError }) => actionError);
  const lastActionedUrl = useFavouritesStore(({ lastActionedUrl }) => lastActionedUrl);
  const addFavourite = useFavouritesStore(({ addFavourite }) => addFavourite);
  const removeFavourite = useFavouritesStore(({ removeFavourite }) => removeFavourite);
  const isFavourited = favourites.includes(imageUrl);
  const isBeingActioned = lastActionedUrl === imageUrl;
  const hasError = actionError && isBeingActioned;

  return (
    <button
      onClick={() => (isFavourited ? removeFavourite(imageUrl) : addFavourite(imageUrl))}
      disabled={isLoading}
      className={`absolute top-4 right-4 bg-white/95 backdrop-blur-md z-20 cursor-pointer flex items-center justify-center
        ${
          hasError
            ? 'text-red-600 p-4 ring-1 ring-red-200 rounded-2xl max-w-[calc(100%-2rem)] shadow-lg'
            : isFavourited
              ? 'text-yellow-500 p-2 rounded-full shadow-sm'
              : 'text-gray-400 hover:text-yellow-500 p-2 rounded-full shadow-sm'
        }
      `}
      aria-label={
        hasError ? actionError : isFavourited ? 'Remove from favourites' : 'Add to favourites'
      }
    >
      {isLoading && isBeingActioned ? (
        <SpinnerIcon className="w-5 h-5 text-primary animate-spin" />
      ) : hasError ? (
        <div className="flex items-start gap-3 text-left">
          <ErrorIcon className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="text-sm font-medium leading-tight">{actionError}</span>
        </div>
      ) : (
        <StarIcon filled={isFavourited} width="20" height="20" />
      )}
    </button>
  );
}
