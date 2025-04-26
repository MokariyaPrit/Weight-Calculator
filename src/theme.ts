import { createTheme, type PaletteMode } from "@mui/material"

// Define common theme settings
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          primary: {
            main: "#1976d2",
            light: "#42a5f5",
            dark: "#1565c0",
          },
          secondary: {
            main: "#9c27b0",
            light: "#ba68c8",
            dark: "#7b1fa2",
          },
          background: {
            default: "#f8f9fa",
            paper: "#ffffff",
          },
          text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.6)",
          },
          divider: "rgba(0, 0, 0, 0.12)",
        }
      : {
          // Dark mode palette
          primary: {
            main: "#90caf9",
            light: "#e3f2fd",
            dark: "#42a5f5",
          },
          secondary: {
            main: "#ce93d8",
            light: "#f3e5f5",
            dark: "#ab47bc",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
            secondary: "rgba(255, 255, 255, 0.7)",
          },
          divider: "rgba(255, 255, 255, 0.12)",
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '24px',
          '&.content-panel:hover': {
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            transform: 'scale(1.01)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          '&.mainContainer': {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          },
          '&.contentContainer': {
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flex: 1,
            padding: '16px',
            gap: '16px',
          },
          '&.panelContainer': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '16px 0',
        }
      }
    }
  },
})

// Create theme instances
export const lightTheme = createTheme(getDesignTokens("light"))
export const darkTheme = createTheme(getDesignTokens("dark"))

// Export a function to get the theme based on mode
export const getTheme = (mode: PaletteMode) => (mode === "light" ? lightTheme : darkTheme)
