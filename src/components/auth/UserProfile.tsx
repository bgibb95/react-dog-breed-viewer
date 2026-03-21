import { useAuthStore } from '@/store/use-auth-store';

export function UserProfile() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <img
          src={user.image}
          alt={user.firstName}
          className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200"
        />
        <span className="text-sm font-medium text-text hidden sm:block">
          {user.firstName} {user.lastName}
        </span>
      </div>
      <button
        onClick={logout}
        className="text-sm font-medium text-text-light hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5 cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
}
