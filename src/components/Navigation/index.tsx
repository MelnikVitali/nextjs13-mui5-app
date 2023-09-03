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
import { usePathname, useSearchParams } from 'next/navigation';

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
      <Typography variant='h6' sx={{ my: 2, marginTop: 10 }}>
        Blog Next.js 13
      </Typography>
      <Divider />
      <List sx={{ marginLeft: 0 }}>
        {navLinks.map((link) => {
          const isActive =
            pathname === `${pathname.substr(0, 3)}${link.href !== '/' ? link.href : ''}`;
          return (
            <MuiLink
              component={Link}
              prefetch={false}
              href={link.href}
              key={link.label}
              sx={{
                textDecoration: 'none',
                bgcolor: 'background.default',
                color: 'text.primary',
                '&:hover': { textDecoration: 'none' },
              }}
            >
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  sx={[
                    { textAlign: 'center', '&:hover': { textDecoration: 'none' } },
                    isActive ? { color: 'rgb(25, 118, 210);', fontSize: '17px' } : null,
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
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
        {navLinks.map((link) => {
          const isActive =
            pathname === `${pathname.substr(0, 3)}${link.href !== '/' ? link.href : ''}`;
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
