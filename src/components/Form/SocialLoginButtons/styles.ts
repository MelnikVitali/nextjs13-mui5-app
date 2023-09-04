export const styles = {
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 1,
    padding: '0.6rem 0',
    columnGap: '1rem',
    textDecoration: 'none',
    color: '#393e45',
    fontWeight: 500,
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    '&:hover': {
      backgroundColor: '#dedede',
      boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)',
    },
    '&.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.26)',
    },
  },
};
