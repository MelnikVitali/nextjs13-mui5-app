export const styles = {
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: '3.5rem',
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    margin: 'auto',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForms: {
    boxShadow: { sm: '0 0 5px #ddd' },
    py: '8rem',
    px: '1rem',
  },
  item: {
    maxWidth: '560px',
    textAlign: 'center',
  },
  boxPassword: {
    width: '100%',
    maxWidth: '18rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    py: '0.8rem',
    mt: 2,
    width: '80%',
    marginInline: 'auto',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 500,
    color: '#3683dc',
    '&:hover': {
      textDecoration: 'underline',
      color: '#5ea1b6',
    },
  },
};
