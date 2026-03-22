import { UserProfile } from '@/components/auth/UserProfile';
import { DogIcon } from '@/components/ui/icons/DogIcon';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const isGallery = location.pathname === '/';

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-2 overflow-hidden">
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group rounded-xl p-1 min-w-0"
        >
          <div className="bg-primary/10 p-2 rounded-xl text-primary group-hover:bg-primary/20 transition-colors shrink-0">
            <DogIcon width="24" height="24" className="drop-shadow-sm sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent truncate leading-tight">
              Pawfect Breeds
            </h1>
            <p className="text-xs sm:text-sm font-medium text-text-light group-hover:text-primary transition-colors hidden sm:block">
              Discover your favourite dogs
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            to={isGallery ? '/favourites' : '/'}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all bg-primary text-white shadow-md hover:bg-primary/90`}
          >
            {isGallery ? 'My Favourites' : 'Gallery'}
          </Link>
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
