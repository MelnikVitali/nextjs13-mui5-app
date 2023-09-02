'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import { Button, Stack } from '@mui/material';

const LocaleSwitcher = () => {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <Stack direction='row' spacing={1} sx={{ alignSelf: 'end' }}>
      {i18n.locales.map((locale) => {
        return (
          <Link href={redirectedPathName(locale)} key={locale}>
            <Button variant='contained' size='small' disabled={Boolean(pathName === `/${locale}`)}>
              {locale}
            </Button>
          </Link>
        );
      })}
    </Stack>
  );
};

export default LocaleSwitcher;
