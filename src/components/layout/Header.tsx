import { DogIcon } from '@/components/ui/icons/DogIcon';
import { UserProfile } from '@/components/auth/UserProfile';

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <DogIcon width="28" height="28" className="drop-shadow-sm" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pawfect Breeds
            </h1>
            <p className="text-sm font-medium text-text-light">Discover your favourite dogs</p>
          </div>
        </div>

        <UserProfile />
      </div>
    </header>
  );
}
