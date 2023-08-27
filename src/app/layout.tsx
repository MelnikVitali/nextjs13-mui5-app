import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Providers } from '@/components/Providers';
import ThemeRegistry from '@/ThemeRegistry/ThemeRegistry';
import { StyledEngineProvider } from '@mui/material/styles';
import { Container, CssBaseline, Pagination } from '@mui/material';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Generated next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      {/* console warning blocking */}
      <body suppressHydrationWarning={true} className={roboto.className}>
        <StyledEngineProvider injectFirst>
          <ThemeRegistry>
            <CssBaseline />
            <Providers>
              <Header />
              <Container sx={{ paddingTop: '5rem', minHeight: 'calc(100vh - 80px)' }}>
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
