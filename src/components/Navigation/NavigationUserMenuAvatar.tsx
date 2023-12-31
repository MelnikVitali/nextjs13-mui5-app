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
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { green, pink } from '@mui/material/colors';
import { stringAvatar } from '@/utils/stringAvatar';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const authItems = [{ label: 'Sign In', href: '/signin' }];

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

  return (
    <Box sx={{ flexGrow: 0 }}>
      {session?.data ? (
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{}}>
            <Avatar
              src={session.data?.user?.image as string}
              {...stringAvatar(session.data?.user?.name as string)}
              alt={session.data?.user?.name as string}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Sign in'>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            {authItems.map((item) => (
              <MuiLink component={Link} key={item.label} prefetch={false} href={item.href}>
                <Avatar sx={{ bgcolor: green[500], width: 32, height: 32 }}>
                  <LoginIcon />
                </Avatar>
              </MuiLink>
            ))}
          </Box>
        </Tooltip>
      )}

      <Menu
        sx={{
          mt: '45px',
          bgcolor: 'rgb(255, 255, 255)',
          //  color: 'rgb(255, 255, 255)'
        }}
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
              {
                bgcolor: 'rgb(255, 255, 255)',
                // color: 'rgb(255, 255, 255)',
                textAlign: 'center',
                '&:hover': {
                  textDecoration: 'none',
                  background: '#F5F5F5 !important',
                },
              },
              pathname === `${pathname.substr(0, 3)}/profile`
                ? { color: '#0f7dc6', fontWeight: 800, fontSize: '1.1rem' }
                : null,
            ]}
          >
            <Typography textAlign='center'> Profile</Typography>
          </MenuItem>
        </Link>
        <Link href='#' onClick={() => signOut({ callbackUrl: '/' })}>
          <MenuItem
            onClick={handleCloseUserMenu}
            sx={{
              bgcolor: 'rgb(255, 255, 255)',
              '&:hover': {
                textDecoration: 'none',
                background: '#F5F5F5 !important',
              },
            }}
          >
            <Typography textAlign='center'> Sign Out</Typography>
          </MenuItem>
        </Link>
      </Menu>
    </Box>
  );
};

export default NavigationUserMenuAvatar;
