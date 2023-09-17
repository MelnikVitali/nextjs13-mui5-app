export const styles = {
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: '3.5rem',
  },
  subWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    margin: 'auto',
  },
  papier: {
    boxShadow: { sm: '0 0 5px #ddd' },
    py: '8rem',
    px: '1rem',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  success: {
    maxWidth: '560px',
    textAlign: 'center',
  },
  gridForm: {
    width: '100%',
    maxWidth: '18rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingButton: {
    py: '0.8rem',
    mt: 2,
    width: '80%',
    marginInline: 'auto',
  },
  signInLink: {
    textDecoration: 'none',
    fontWeight: 500,
    color: '#3683dc',
    '&:hover': {
      textDecoration: 'underline',
      color: '#5ea1b6',
    },
  },
};
