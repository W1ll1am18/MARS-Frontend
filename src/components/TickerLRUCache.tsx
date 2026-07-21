const STORAGE_KEY = 'recent-tickers';

export class TickerLRUCache {
  private capacity: number;
  private cache: Map<string, string>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = this.load();
  }

  private load(): Map<string, string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Map();
      const entries: [string, string][] = JSON.parse(raw);
      return new Map(entries);
    } catch {
      // Corrupt data, or localStorage unavailable
      return new Map();
    }
  }

  private save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.cache.entries())));
    } catch {
      // Fail silently — worst case 
    }
  }

  get(key: string): string | null {
    if (!this.cache.has(key)) return null;

    // Refresh item priority
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    this.save();
    return value;
  }

  put(key: string, value: string) {
    // If key exists, delete it first so it gets 'refreshed'
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Map.keys().next().value extracts the oldest item inserted
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) this.cache.delete(oldestKey);
    }

    this.cache.set(key, value);
    this.save();
  }

  // Most-recently-used first, for display.
  getList(): string[] {
    return Array.from(this.cache.keys()).reverse();
  }

  clear() {
    this.cache.clear();
    this.save();
  }
}

export const tickerLRUCache = new TickerLRUCache(10);