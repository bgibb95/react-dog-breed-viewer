import { useEffect } from 'react';
import { useAuthStore } from '@/store/use-auth-store';

export function useAuthSession() {
  const { user, isLoading, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return { user, isAuthLoading: isLoading };
}
