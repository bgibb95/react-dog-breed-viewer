import { useEffect } from 'react';
import { BreedSelector } from './components/BreedSelector';
import { Header } from './components/Header';
import { ImageGallery } from './components/ImageGallery';
import { useDogStore } from './store/use-dog-store';

export default function App() {
  const loadBreeds = useDogStore(({ loadBreeds }) => loadBreeds);

  useEffect(() => {
    loadBreeds();
  }, [loadBreeds]);

  return (
    <div className="min-h-screen bg-background font-sans text-text flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar: Breed Selector */}
        <aside className="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="h-96 md:h-[calc(100vh-10rem)] md:sticky md:top-0 md:pb-8 z-10">
            <BreedSelector />
          </div>
        </aside>

        {/* Right Content: Image Gallery */}
        <section className="w-full md:w-2/3 lg:w-3/4 min-h-96">
          <ImageGallery />
        </section>
      </main>
    </div>
  );
}
