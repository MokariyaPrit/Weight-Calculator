import { createTheme, type PaletteMode, type ThemeOptions } from "@mui/material"

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary:    { main: "#4f46e5", light: "#818cf8", dark: "#3730a3" },
          secondary:  { main: "#7c3aed", light: "#a78bfa", dark: "#5b21b6" },
          success:    { main: "#16a34a", light: "#bbf7d0", dark: "#14532d", contrastText: "#fff" },
          error:      { main: "#dc2626", light: "#fecaca", dark: "#991b1b", contrastText: "#fff" },
          background: { default: "#f1f5f9", paper: "#ffffff" },
          text:       { primary: "rgba(0,0,0,0.87)", secondary: "rgba(0,0,0,0.55)" },
          divider:    "rgba(0,0,0,0.08)",
        }
      : {
          primary:    { main: "#818cf8", light: "#c7d2fe", dark: "#6366f1" },
          secondary:  { main: "#a78bfa", light: "#ddd6fe", dark: "#7c3aed" },
          success:    { main: "#4ade80", light: "#166534", dark: "#86efac", contrastText: "#fff" },
          error:      { main: "#f87171", light: "#7f1d1d", dark: "#fca5a5", contrastText: "#fff" },
          background: { default: "#0f172a", paper: "#1e293b" },
          text:       { primary: "#f1f5f9", secondary: "rgba(241,245,249,0.6)" },
          divider:    "rgba(255,255,255,0.08)",
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600, fontSize: "1.1rem" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: "none",
          '&.content-panel': { transition: 'box-shadow 0.25s ease' },
          '&.content-panel:hover': { boxShadow: '0 6px 24px rgba(0,0,0,0.12)' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { "& .MuiOutlinedInput-root": { borderRadius: 10 } },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: "none", fontWeight: 600 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "0 1px 0 rgba(0,0,0,0.1)" },
      },
    },
  },
})

export const lightTheme = createTheme(getDesignTokens("light"))
export const darkTheme  = createTheme(getDesignTokens("dark"))
export const getTheme   = (mode: PaletteMode) => (mode === "light" ? lightTheme : darkTheme)