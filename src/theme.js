import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#6A1B9A', // Default border color
            },
            '&:hover fieldset': {
              borderColor: '#6A1B9A', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6A1B9A', // Border color when focused
            },
          },
        },
      },
    },
  },
});

export default theme;