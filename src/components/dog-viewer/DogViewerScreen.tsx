import { useBreedLoader } from '@/hooks/use-breed-loader';
import { BreedSelector } from './BreedSelector';
import { ImageGallery } from './ImageGallery';
import { FavouriteButton } from '@/components/favourites/FavouriteButton';

export function DogViewerScreen() {
  useBreedLoader();

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/3 lg:w-1/4 shrink-0">
        <div className="h-96 md:h-[calc(100vh-10rem)] md:sticky md:top-0 md:pb-8 z-10">
          <BreedSelector />
        </div>
      </aside>

      <section className="w-full md:w-2/3 lg:w-3/4 min-h-96">
        <ImageGallery actionOverlay={(url) => <FavouriteButton imageUrl={url} />} />
      </section>
    </main>
  );
}
