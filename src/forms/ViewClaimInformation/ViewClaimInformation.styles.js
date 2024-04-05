const styles = (theme) => ({
  root: {
    ...theme.mixins.modal.dialog.root,
  },
  wrapper: {
    margin: theme.spacing(0, 5, 5, 5),
    paddingTop: theme.spacing(5),
    borderTop: `1px solid ${theme.palette.neutral.light}`,
    '& a': { display: 'none' },
  },
  docsContainer: {
    padding: theme.spacing(1, 0.5),
    borderTop: `1px solid ${theme.palette.neutral.light}`,
  },
});

export default styles;
