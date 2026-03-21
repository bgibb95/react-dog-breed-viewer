import { LoginScreen } from './components/auth/LoginScreen';
import { DogViewerScreen } from './components/dog-viewer/DogViewerScreen';
import { LoadingState } from './components/ui/feedback/LoadingState';
import { useAuthSession } from './hooks/use-auth-session';

export default function App() {
  const { user, isAuthLoading } = useAuthSession();

  if (isAuthLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <LoadingState message="Loading..." />
      </main>
    );
  }

  if (!user) return <LoginScreen />;

  return <DogViewerScreen />;
}
