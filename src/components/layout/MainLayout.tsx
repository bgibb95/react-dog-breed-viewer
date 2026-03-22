import { useFavouritesLoader } from '@/hooks/use-favourites-loader';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function MainLayout() {
  useFavouritesLoader();

  return (
    <div className="min-h-screen bg-background font-sans text-text flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
