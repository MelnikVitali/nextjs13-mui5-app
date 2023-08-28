'use client';
import Link from 'next/link';
import {
  Link as MuiLink,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { stringAvatar } from '@/utils/stringAvatar';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ContentCutOutlined } from '@mui/icons-material';

const authItems = [
  { label: 'Sign In', href: '/signin' },
  { label: 'Sign Un', href: '/signup' },
];

const NavigationUserMenuAvatar = () => {
  const session = useSession();
  const pathname = usePathname();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log('session -->', session);
  return (
    <Box sx={{ flexGrow: 0 }}>
      {session?.data ? (
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              src={session.data?.user?.image as string}
              {...stringAvatar(session.data?.user?.name as string)}
              alt={session.data?.user?.name as string}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          {authItems.map((item) => (
            <MuiLink
              component={Link}
              key={item.label}
              prefetch={false}
              href={item.href}
              sx={[
                { display: 'block', '&:hover': { textDecoration: 'none' } },
                pathname === item.href ? { color: '#ccc' } : { color: '#fff' },
              ]}
            >
              <ListItemButton sx={{ padding: '4px 10px' }}>
                <ListItemText
                  primary={item.label}
                  sx={{ '& .MuiListItemText-primary': { fontSize: { xs: '0.8rem', sm: '1rem' } } }}
                />
              </ListItemButton>
            </MuiLink>
          ))}
        </Box>
      )}

      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Link href='/profile'>
          <MenuItem
            onClick={handleCloseUserMenu}
            sx={[
              { textAlign: 'center', '&:hover': { textDecoration: 'none' } },
              pathname === '/profile' ? { color: '#0f7dc6' } : null,
            ]}
          >
            <Typography textAlign='center'> Profile</Typography>
          </MenuItem>
        </Link>
        <Link href='#' onClick={() => signOut({ callbackUrl: '/' })}>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign='center'> Sign Out</Typography>
          </MenuItem>
        </Link>
      </Menu>
    </Box>
  );
};

export default NavigationUserMenuAvatar;
