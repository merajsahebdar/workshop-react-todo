// Theme Interface
type Theme = {
  fontFamily: string;
};

/**
 * Theme
 */
const theme: Theme = {
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Roboto"',
    '"Oxygen"',
    '"Ubuntu"',
    '"Cantarell"',
    '"Fira Sans"',
    '"Droid Sans"',
    '"Helvetica Neue"',
    'sans-serif',
  ].join(', '),
};

// DEFAULT EXPORT
export default theme;
