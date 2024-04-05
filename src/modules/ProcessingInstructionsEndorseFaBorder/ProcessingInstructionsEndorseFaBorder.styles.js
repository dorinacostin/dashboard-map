const styles = (theme) => ({
  hideContent: {
    display: 'none',
  },
  textarea: {
    backgroundColor: 'white',
  },
  datepicker: {
    backgroundColor: 'white',
  },
  checkboxGroup: {
    marginTop: '0 !important',
    paddingBottom: '0 !important',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  errorMessage: {
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.error.main,
  },
  sticky: {
    height: 48,
  },
  stickyActive: {
    width: 'calc(100% + 48px)',
    marginRight: -24,
    marginLeft: -24,
    paddingRight: 0,
    paddingLeft: 0,

    '@media (min-width: 600px)': {
      width: 'calc(100% + 80px)',
      marginRight: -40,
      marginLeft: -40,
      paddingRight: 40,
      paddingLeft: 40,
    },
  },
});

export default styles;
