import { Box, Tab, Tabs, styled } from '@mui/material';

export const HeaderContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

interface CustomTabsProps {
  tab: 'add' | 'remove';
}

export const CustomTabs = styled(Tabs, {
  shouldForwardProp: (prop) => prop !== 'tab',
})<CustomTabsProps>(({ theme, tab }) => ({
  minHeight: 0,
  height: 28,
  '& .MuiTab-root': {
    fontSize: 16,
    color: theme.palette.text.secondary,
  },
  '& .Mui-selected': {
    color: tab === 'remove' ? theme.palette.error.dark : theme.palette.primary.main,
  },
  '& .MuiTabs-indicator': {
    backgroundColor: tab === 'remove' ? theme.palette.error.dark : theme.palette.primary.main,
  },
}));

export const CustomTab = styled(Tab)(() => ({
  padding: 0,
  minHeight: 0,
  height: 28,
}));

export const EmptyStateImage = styled('img')(() => ({
  maxWidth: '220px',
}));
