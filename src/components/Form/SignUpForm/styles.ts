import { Wrapper } from '../../UserProfile/styles';
export const styles = {
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: '3rem',
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
    pt: '4rem',
    px: '1rem',
  },
  title: {
    textAlign: 'center',
    width: '100%',
    mb: '',
    pb: { sm: '2rem' },
  },
  containerForm: {
    justifyContent: 'space-between',
    maxWidth: { sm: '18rem' },
    marginInline: 'auto',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  loadingButton: {
    py: '0.8rem',
    mt: 2,
    width: '80%',
    marginInline: 'auto',
  },
  errorText: {
    marginTop: '1rem',
  },
  linkSignIn: {
    textDecoration: 'none',
    color: '#3683dc',
    '&:hover': {
      textDecoration: 'underline',
      color: '#5ea1b6',
    },
  },
};
