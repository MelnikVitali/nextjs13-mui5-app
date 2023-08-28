'use client';
import Navigation from '@/components/Navigation';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import NavigationUserMenuAvatar from './NavigationUserMenuAvatar';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}></Box>
      <AppBar component='nav' position='fixed' sx={{ zIndex: 2000 }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
              display: { sm: 'block' },
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Blog Next.js 13
          </Typography>

          <Navigation
            navLinks={navItems}
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
          />

          <NavigationUserMenuAvatar />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
