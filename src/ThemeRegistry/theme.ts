import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export let customTheme = {
  // palette: {
  //   mode: 'dark',
  // },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        //@ts-ignore
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
    // Name of the component
    MuiPopover: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: 'transparent !important',
        },
      },
    },
  },
};
