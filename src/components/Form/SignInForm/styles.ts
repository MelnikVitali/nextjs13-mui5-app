export const styles = {
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: '3rem',
  },
  wrapperForm: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    margin: 'auto',
  },
  formContainer: {
    boxShadow: { sm: '0 0 5px #ddd' },
    py: '8rem',
    px: '1rem',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: { sm: '3rem' },
  },
  signInFormContainer: {
    justifyContent: 'space-between',
    maxWidth: { sm: '45rem' },
    marginInline: 'auto',
  },
  isTrustDeviceController: {
    '& .MuiFormControlLabel-label': {
      fontSize: '0.8rem',
      fontWeight: 400,
      color: '#666666',
    },
  },
  isTrustDeviceCheckbox: { pl: '10px' },
  loadingButton: {
    py: '0.8rem',
    mt: 2,
    width: '80%',
    marginInline: 'auto',
  },
  withAnotherProvider: {
    paddingLeft: { sm: '3rem' },
    mb: '2.2rem',
    textAlign: 'center',
  },
  signupLink: {
    textDecoration: 'none',
    color: '#3683dc',
    '&:hover': {
      textDecoration: 'underline',
      color: '#5ea1b6',
    },
  },
  forgotLink: {
    textDecoration: 'none',
    color: '#3683dc',
    '&:hover': {
      textDecoration: 'underline',
      color: '#5ea1b6',
    },
  },
};
