import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuthStore } from './use-auth-store';
import { useDogStore } from './use-dog-store';
import { useFavouritesStore } from './use-favourites-store';

vi.mock('./helpers/api-client', () => ({ apiClient: vi.fn() }));

describe('useAuthStore logout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
        firstName: 'test',
        lastName: 'user',
        gender: 'male',
        image: 'test.jpg',
      },
      error: 'some error',
    });
    useDogStore.setState({ selectedBreed: 'beagle', images: ['url1'] });
    useFavouritesStore.setState({ favourites: ['url1'] });
  });

  it('should clear all stores on logout', () => {
    const { logout } = useAuthStore.getState();

    logout();

    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().error).toBeNull();
    expect(useDogStore.getState().selectedBreed).toBeNull();
    expect(useDogStore.getState().images).toEqual([]);
    expect(useFavouritesStore.getState().favourites).toEqual([]);
    expect(localStorage.getItem('isAuthenticated')).toBeNull();
  });
});
