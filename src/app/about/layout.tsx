'use client';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import { FC } from 'react';
import { usePathname } from 'next/navigation';

interface AboutLayoutProps {
  children: React.ReactNode;
}

const AboutLayout: FC<AboutLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <div>
      <h1>About us</h1>
      <ul>
        <li>
          <MuiLink
            href='/about/team'
            underline='hover'
            color='inherit'
            component={Link}
            sx={{ color: `${pathname === '/about/team' ? '#0f7dc6' : 'inherit'}` }}
          >
            Team
          </MuiLink>
        </li>
        <li>
          <MuiLink
            href='/about/contacts'
            underline='hover'
            component={Link}
            sx={{ color: `${pathname === '/about/contacts' ? '#0f7dc6' : 'inherit'}` }}
          >
            Contacts
          </MuiLink>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default AboutLayout;
