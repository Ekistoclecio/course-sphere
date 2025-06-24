import { Palette } from '@mui/material';

export const palette: Partial<Palette> = {
  primary: {
    main: '#7C4DFF',
    light: '#B388FF',
    dark: '#651FFF',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#00BFA5',
    light: '#5DF2D6',
    dark: '#008E76',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#E53935',
    light: '#EF5350',
    dark: '#C62828',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FBC02D',
    light: '#FFE082',
    dark: '#C49000',
    contrastText: '#000000',
  },
  success: {
    main: '#43A047',
    light: '#66BB6A',
    dark: '#2E7D32',
    contrastText: '#FFFFFF',
  },
  text: {
    primary: '#1A2B52',
    secondary: '#5A6782',
    disabled: '#B0BACB',
  },
  action: {
    active: '#D9E2F1',
    hover: '#10254B',
    hoverOpacity: 0.08,
    selected: '#1A2B52',
    selectedOpacity: 0.16,
    disabled: '#5A6782',
    disabledBackground: '#1A2B52',
    disabledOpacity: 0.38,
    focus: '#1A2B52',
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
  background: {
    default: '#0A1A33',
    paper: '#F3F6FA',
  },
};
