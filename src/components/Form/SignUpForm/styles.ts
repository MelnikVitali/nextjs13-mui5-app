export const styles = {
  formInput: {
    '& label.Mui-focused': {
      color: '#9A9A9A',
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
};
