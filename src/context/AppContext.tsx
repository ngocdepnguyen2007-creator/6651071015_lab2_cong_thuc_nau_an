import { useEffect, useState, type ReactNode } from 'react'
import { AppContext } from './appContextValue'
import type { Language } from '../data/recipes'

function readSavedLanguage(): Language {
  const savedLanguage = window.localStorage.getItem('bepnho-language')
  return savedLanguage === 'en' ? 'en' : 'vi'
}

function readCompareIds(): string[] {
  const savedIds = window.localStorage.getItem('bepnho-compare')
  if (!savedIds) return []

  try {
    const parsed: unknown = JSON.parse(savedIds)
    if (Array.isArray(parsed) && parsed.every((id): id is string => typeof id === 'string')) {
      return [...new Set(parsed)].slice(0, 3)
    }
  } catch {
    window.localStorage.removeItem('bepnho-compare')
  }
  return []
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>(readSavedLanguage)
  const [compareIds, updateCompareIds] = useState<string[]>(readCompareIds)
  const [announcement, announce] = useState('')

  useEffect(() => {
    window.localStorage.setItem('bepnho-language', language)
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    if (compareIds.length === 0) {
      window.localStorage.removeItem('bepnho-compare')
      return
    }
    window.localStorage.setItem('bepnho-compare', JSON.stringify(compareIds))
  }, [compareIds])

  useEffect(() => {
    if (!announcement) return
    const timeout = window.setTimeout(() => announce(''), 2600)
    return () => window.clearTimeout(timeout)
  }, [announcement])

  const setLanguage = (nextLanguage: Language) => {
    updateLanguage(nextLanguage)
  }

  const toggleCompare = (id: string) => {
    updateCompareIds((currentIds) => {
      const nextIds = currentIds.includes(id)
        ? currentIds.filter((currentId) => currentId !== id)
        : currentIds.length < 3
          ? [...currentIds, id]
          : currentIds
      return nextIds
    })
  }

  const clearCompare = () => {
    updateCompareIds([])
  }

  const value = { language, setLanguage, compareIds, toggleCompare, clearCompare, announcement, announce }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
