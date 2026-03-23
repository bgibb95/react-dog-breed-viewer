import { ErrorState } from '@/components/ui/feedback/ErrorState';
import { LoadingState } from '@/components/ui/feedback/LoadingState';
import { SearchIcon } from '@/components/ui/icons/SearchIcon';
import { useDogStore } from '@/store/use-dog-store';
import { useState } from 'react';

export function BreedSelector() {
  const breeds = useDogStore(({ breeds }) => breeds);
  const selectedBreed = useDogStore(({ selectedBreed }) => selectedBreed);
  const setSelectedBreed = useDogStore(({ setSelectedBreed }) => setSelectedBreed);
  const isLoadingBreeds = useDogStore(({ isLoadingBreeds }) => isLoadingBreeds);
  const breedsError = useDogStore(({ breedsError }) => breedsError);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoadingBreeds) {
    return (
      <div className="h-full bg-surface rounded-2xl shadow-sm border border-gray-100/50 flex items-center justify-center">
        <LoadingState message="Fetching breeds..." />
      </div>
    );
  }

  if (breedsError) return <ErrorState message={breedsError} />;

  return (
    <div className="flex flex-col h-full bg-surface rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon width="20" height="20" className="text-gray-500" />
          </div>
          <input
            type="text"
            aria-label="Search breeds"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50/50 placeholder-gray-500 transition-all sm:text-sm"
            placeholder="Search for a breed"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {filteredBreeds.length === 0 ? (
          <div className="p-6 text-center text-text-light">
            No breeds found matching "{searchQuery}"
          </div>
        ) : (
          filteredBreeds.map((breed) => (
            <button
              key={breed}
              onClick={() => setSelectedBreed(breed)}
              className={`w-full text-left px-4 py-2 rounded-xl capitalize transition-all duration-200 flex items-center justify-between cursor-pointer ${
                selectedBreed === breed
                  ? 'bg-primary text-white shadow-md shadow-primary/20 font-semibold tracking-wide'
                  : 'text-text hover:bg-gray-50/80 active:bg-gray-100 font-medium'
              }`}
            >
              {breed}
              {selectedBreed === breed && (
                <div className="w-2 h-2 rounded-full bg-white opacity-90" />
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
