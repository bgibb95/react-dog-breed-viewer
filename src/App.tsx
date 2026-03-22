import { LoginScreen } from './components/auth/LoginScreen';
import { DogViewerScreen } from './components/dog-viewer/DogViewerScreen';
import { MyFavouritesScreen } from './components/favourites/MyFavouritesScreen';
import { MainLayout } from './components/layout/MainLayout';
import { LoadingState } from './components/ui/feedback/LoadingState';
import { useAuthSession } from './hooks/use-auth-session';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  const { user, isAuthLoading } = useAuthSession();

  if (isAuthLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <LoadingState message="Loading..." />
      </main>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<LoginScreen />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DogViewerScreen />} />
        <Route path="/favourites" element={<MyFavouritesScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
