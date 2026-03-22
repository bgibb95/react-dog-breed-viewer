import { ErrorState } from '@/components/ui/feedback/ErrorState';
import { DogIcon } from '@/components/ui/icons/DogIcon';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/use-auth-store';
import { useState, type SyntheticEvent } from 'react';

export function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (!username || !password) return;

    await login(username, password);
  }

  return (
    <main className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-4 rounded-3xl text-primary">
            <DogIcon width="48" height="48" className="drop-shadow-md" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-text">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-text-light">
          Use DummyJSON credentials (e.g. emilys / emilyspass)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100/50 backdrop-blur-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Username"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {!!error && <ErrorState message={error} />}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
