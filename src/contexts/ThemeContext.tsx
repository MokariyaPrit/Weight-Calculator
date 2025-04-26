"use client"

import type React from "react"
import { createContext, useContext, useState, useMemo, useEffect } from "react"
import { type PaletteMode, ThemeProvider as MuiThemeProvider } from "@mui/material"
import { getTheme } from "../theme"

type ThemeContextType = {
  mode: PaletteMode
  toggleColorMode: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
})

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get the initial theme from localStorage or default to 'light'
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem("themeMode")
    return (savedMode as PaletteMode) || "light"
  })

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode)
  }, [mode])

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    [mode],
  )

  // Get the theme based on the current mode
  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
