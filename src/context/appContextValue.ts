import { createContext } from 'react'
import type { Language } from '../data/recipes'

export interface AppContextValue {
  language: Language
  setLanguage: (language: Language) => void
  compareIds: string[]
  toggleCompare: (id: string) => void
  clearCompare: () => void
  announcement: string
  announce: (message: string) => void
}

export const AppContext = createContext<AppContextValue | null>(null)
