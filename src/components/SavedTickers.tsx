const STORAGE_KEY = 'saved_tickers'

export class SavedTickers {
  private tickers: Set<string>

  constructor() {
    this.tickers = this.load()
  }

  private load(): Set<string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return new Set()
      const entries: string[] = JSON.parse(raw)
      return new Set(entries)
    } catch {
      return new Set()
    }
  }

  private save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.tickers)))
    } catch {
      // Fail silently
    }
  }

  add(value: string) {
    this.tickers.add(value)
    this.save()
  }

  remove(value: string) {
    this.tickers.delete(value)
    this.save()
  }

  has(value: string): boolean {
    return this.tickers.has(value)
  }

  //Adds if absent, removes if present. Returns the new saved state.
  toggle(value: string): boolean {
    if (this.tickers.has(value)) {
      this.remove(value)
      return false
    }
    this.add(value)
    return true
  }

  getList(): string[] {
    return Array.from(this.tickers)
  }

  clear() {
    this.tickers.clear()
    this.save()
  }
}