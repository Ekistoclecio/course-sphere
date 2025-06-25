import {
  Box,
  darken,
  Paper,
  Stack,
  styled,
  Button,
  TextField as MuiTextField,
  InputLabel as MuiInputLabel,
  Select as MuiSelect,
  Chip as MuiChip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

export const Root = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4, 3),
  overflow: 'scroll',
  [theme.breakpoints.down('md')]: {
    overflow: 'hidden',
  },
}));

export const TextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.secondary,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.primary.dark} !important`,
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.text.secondary,
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.primary.main} !important`,
  },
}));

export const InputLabel = styled(MuiInputLabel)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '.MuiFormControl-root:hover &': {
    color: theme.palette.primary.dark,
  },
}));

export const Select = styled(MuiSelect)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.secondary,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.text.secondary,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.dark,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

export const Chip = styled(MuiChip)(() => ({
  fontSize: '12px',
  fontWeight: 500,
  padding: '4px 8px',
  '& .MuiChip-icon': {
    fontSize: '16px',
  },
}));

export const Container = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    overflow: 'scroll',
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

export const HeaderInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const HeaderActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  minWidth: '170px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
  },
}));

export const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flex: 1,
  minHeight: 0,
  backgroundColor: theme.palette.background.emphasis,
  borderRadius: 8,
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    flex: 'none',
  },
}));

export const VideoContainer = styled(Box)(({ theme }) => ({
  width: '70%',
  height: '100%',
  minHeight: '500px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '500px',
  },
}));

export const VideoIframe = styled('iframe')(() => ({
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: 8,
}));

export const LessonsContainer = styled(Box)(({ theme }) => ({
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
  },
}));

export const LessonsFilters = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

export const LessonsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingRight: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
  },
}));

export const LessonCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: darken(theme.palette.background.card, 0.4),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: darken(theme.palette.background.card, 0.2),
  },
}));

export const LessonThumbnail = styled('img')(() => ({
  width: 120,
  height: 68,
  borderRadius: 4,
  objectFit: 'cover',
}));

export const LessonInfo = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

export const StyledSettingsIcon = styled(SettingsIcon)(() => ({
  fontSize: 'small',
}));

export const ManageButton = styled(Button)(() => ({
  padding: 0,
  minWidth: 24,
  height: 24,
}));
