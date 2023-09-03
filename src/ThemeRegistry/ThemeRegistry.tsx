'use client';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { ThemeToggleContext } from '@/context/ThemeToggleContext';
import { customTheme } from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    (window.localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        window.localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        ...customTheme,
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeToggleContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </NextAppDirEmotionCacheProvider>
  );
}
