'use client';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Locale } from '@/configs/i18n.config';

interface Props {
  children: React.ReactNode;
  params: { lang: Locale };
}

const AboutLayout: FC<Props> = ({ children, params: { lang } }) => {
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
            sx={{ color: `${pathname === `/${lang}/about/team` ? '#0f7dc6' : 'inherit'}` }}
          >
            Team
          </MuiLink>
        </li>
        <li>
          <MuiLink
            href='/about/contacts'
            underline='hover'
            component={Link}
            sx={{ color: `${pathname === `/${lang}/about/contacts` ? '#0f7dc6' : 'inherit'}` }}
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
