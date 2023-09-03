'use client';
import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import SVG ICONS from icons-material firstly install icons pnpm add @mui/icons-mater
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeToggleContext } from '@/context/ThemeToggleContext';

export function ThemeToggle() {
  // check theme is dark or light
  const theme = useTheme();

  // useContect Hook get value https://react.dev/reference/react/useContext
  const themeToggle = useContext(ThemeToggleContext);

  return (
    <IconButton
      sx={{ mr: 2, fontSize: '30px' }}
      onClick={themeToggle.toggleColorMode}
      color='inherit'
    >
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
