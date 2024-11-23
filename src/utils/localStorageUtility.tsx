type LOCAL_STORAGE_KEY = "task-buddy" | "task-filter" | "dark-mode";

export function storeToLocalStorage<T>(key: LOCAL_STORAGE_KEY, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function storedLocalStorageData<T>(key: LOCAL_STORAGE_KEY): T | null {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data) as T;
  }
  return null;
}
