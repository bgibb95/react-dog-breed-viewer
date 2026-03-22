import { create } from 'zustand';
import { apiClient } from './helpers/api-client';

const authApiBaseUrl = '/api/auth';
const tokenExpirationTimeInMinutes = 30;
// We should refresh before the token expires
const tokenRefreshIntervalInMinutes = 25;

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  initAuth: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
};

let refreshTimer: ReturnType<typeof setInterval> | null = null;
let isInitialising = false;

function setupRefreshTimer(refreshSession: () => Promise<boolean>) {
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(() => refreshSession(), tokenRefreshIntervalInMinutes * 60 * 1000);
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await apiClient<User>(`${authApiBaseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: tokenExpirationTimeInMinutes }),
      });

      setupRefreshTimer(get().refreshSession);

      localStorage.setItem('isAuthenticated', 'true');
      set({ user, isLoading: false });
    } catch {
      set({
        error: 'Login failed. Please check your username and password.',
        isLoading: false,
      });
    }
  },
  logout: () => {
    if (refreshTimer) clearInterval(refreshTimer);
    localStorage.removeItem('isAuthenticated');
    set({ user: null });
  },
  initAuth: async () => {
    if (isInitialising) return;
    isInitialising = true;

    set({ isLoading: true });

    if (localStorage.getItem('isAuthenticated') !== 'true') {
      set({ isLoading: false });
      isInitialising = false;
      return;
    }

    async function fetchCurrentUser() {
      return apiClient<User>(`${authApiBaseUrl}/me`, { method: 'GET' });
    }

    try {
      const user = await fetchCurrentUser();
      setupRefreshTimer(get().refreshSession);
      set({ user, isLoading: false, error: null });
    } catch {
      // Try refresh if auth/me fails (e.g., token expired)
      if (await get().refreshSession()) {
        try {
          const user = await fetchCurrentUser();
          setupRefreshTimer(get().refreshSession);
          set({ user, isLoading: false, error: null });
          return;
        } catch {
          // Fallback to logout on second failure
        }
      }

      get().logout();
      set({ isLoading: false });
    } finally {
      isInitialising = false;
    }
  },
  refreshSession: async () => {
    try {
      const response = await fetch(`${authApiBaseUrl}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expiresInMins: tokenExpirationTimeInMinutes }),
        credentials: 'include',
      });

      if (!response.ok) return false;

      return true;
    } catch {
      return false;
    }
  },
}));
