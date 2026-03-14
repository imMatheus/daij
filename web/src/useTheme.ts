import { useState, useEffect } from 'react'

const THEMES = ['pink', 'green', 'blue', 'yellow', 'orange'] as const
export type Theme = (typeof THEMES)[number]

export const THEME_COLORS: Record<Theme, string> = {
  pink: 'rgb(255, 0, 84)',
  green: 'rgb(41, 191, 18)',
  blue: 'rgb(7, 42, 200)',
  yellow: 'rgb(255, 189, 0)',
  orange: 'rgb(251, 86, 7)',
}

const STORAGE_KEY = 'daij-theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return THEMES.includes(stored as Theme) ? (stored as Theme) : 'pink'
  })

  useEffect(() => {
    const root = document.documentElement
    THEMES.forEach((t) => root.classList.remove(`theme-${t}`))
    root.classList.add(`theme-${theme}`)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return { theme, setTheme: setThemeState, themes: THEMES }
}
