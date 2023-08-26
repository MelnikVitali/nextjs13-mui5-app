'use client';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  label: string;
  href: string;
}
interface NavigationProps {
  navLinks: NavLink[];
  window?: () => Window;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  navLinks,
  window,
  handleDrawerToggle,
  mobileOpen,
}) => {
  const pathname = usePathname();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <MuiLink
              component={Link}
              prefetch={false}
              href={link.href}
              key={link.label}
              sx={{
                textDecoration: 'none',
                color: 'rgba(0, 0, 0, 0.87)',
                '&:hover': { textDecoration: 'none' },
              }}
            >
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  sx={[
                    { textAlign: 'center', '&:hover': { textDecoration: 'none' } },
                    isActive ? { color: '#0f7dc6' } : null,
                  ]}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            </MuiLink>
          );
        })}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, ml: '-80px' }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <MuiLink
              component={Link}
              prefetch={false}
              href={link.href}
              key={link.label}
              sx={[
                { '&:hover': { textDecoration: 'none' } },
                isActive
                  ? { color: 'rgba(255, 255, 255, 0.5)', fontSize: '1.1rem !important' }
                  : { color: '#fff' },
              ]}
            >
              <ListItemButton>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </MuiLink>
          );
        })}
      </Box>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navigation;
