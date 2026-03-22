import type { ReactNode } from 'react';

type Props = {
  imageUrl: string;
  selectedBreed?: string;
  actionOverlay?: ReactNode;
};

export function ImageCard({ imageUrl, selectedBreed, actionOverlay }: Props) {
  return (
    <div className="group relative break-inside-avoid mb-6 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100">
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300 pointer-events-none" />
      <img
        src={imageUrl}
        alt={selectedBreed ? `${selectedBreed} dog` : 'Dog'}
        className="w-full h-auto block transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        loading="lazy"
      />
      {actionOverlay}
    </div>
  );
}
