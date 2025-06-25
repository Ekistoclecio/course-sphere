import { theme } from '@/theme';

export const globalStyles = {
  html: {
    scrollBehavior: 'smooth',
    fontSize: '62.5%',
  },
  body: {
    backgroundColor: theme.palette.background!.default,
    color: theme.palette.text!.primary,
  },
  '*': {
    boxSizing: 'border-box',
  },
  '::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: `${theme.palette.primary!.main}aa`,
    borderRadius: '8px',
    border: `2px solid transparent`,
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.primary!.main,
  },
  '::-webkit-scrollbar-corner': {
    background: 'transparent',
  },
};
