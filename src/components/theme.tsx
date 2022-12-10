import { createContext, type FC, type ReactNode, useContext, useState, } from 'react'

export const ThemeContext = createContext({ theme: '', toggle_theme: () =>  {}})

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'' | 'dark'>('dark')

  const toggle_theme = () => setTheme((current) => (current === 'dark' ? '' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggle_theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
