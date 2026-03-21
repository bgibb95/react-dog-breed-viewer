type Cache<T> = {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
};

export const createMemoryCache = <T>(): Cache<T> => new Map<string, T>();

export function createSessionCache<T>(namespace: string): Cache<T> {
  const storageKey = (key: string) => `${namespace}:${key}`;

  return {
    get: (key) => {
      const rawStorageItem = sessionStorage.getItem(storageKey(key));

      return rawStorageItem !== null ? (JSON.parse(rawStorageItem) as T) : undefined;
    },
    set: (key, value) => sessionStorage.setItem(storageKey(key), JSON.stringify(value)),
  };
}
