export const styles = {
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: '3.5rem',
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
  formInput: {
    '& label.Mui-focused': {
      color: 'rgb(255, 255, 255)',
      fontWeight: 400,
    },
    '& .MuiInputBase-input': {
      borderColor: '#c8d0d4',
    },
    '& .MuiInput-underline:after': {
      border: 'none',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#d32f2f',
        },
      },
      '& fieldset': {
        borderColor: '#c8d0d4',
        borderRadius: 0,
      },
      '&:hover fieldset': {
        border: '1px solid #c8d0d4',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #c8d0d4',
      },
    },
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
