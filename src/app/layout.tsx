import './globals.css';
import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n.config';
import { Roboto } from 'next/font/google';
import ThemeRegistry from '@/ThemeRegistry/ThemeRegistry';
import { StyledEngineProvider } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import { Providers } from '@/context/AuthContext';
import ToasterContext from '@/context/ToasterContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next13 and MUI5 App',
  description: 'Generated next app',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      {/* console warning blocking */}
      <body suppressHydrationWarning={true} className={roboto.className}>
        <StyledEngineProvider injectFirst>
          <ThemeRegistry>
            <CssBaseline />
            <ToasterContext />
            <Providers>
              <Header />
              <Container sx={{ paddingTop: '5rem', minHeight: 'calc(100vh - 110px)' }}>
                {children}
              </Container>
              <Footer />
            </Providers>
          </ThemeRegistry>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
