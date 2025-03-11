import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e4e5f2',
      100: '#c2c4e5',
      200: '#9fa3d8',
      300: '#7c82cb',
      400: '#5961be',
      500: '#3640b1',
      600: '#2d3691',
      700: '#242c71',
      800: '#1b2251',
      900: '#121831',
      950: '#090c11',
    },
    secondary: {
      50: '#f2f2f9',
      100: '#e5e5f2',
      200: '#d8d8eb',
      300: '#cbcbdf',
      400: '#bebed3',
      500: '#b1b1c7',
      600: '#9191a1',
      700: '#71717b',
      800: '#515155',
      900: '#31312f',
      950: '#111111',
    },
  },
  dark: {
    primary: '#0112c2',
    secondary: '#e4e5f2',
  },
  light: {
    primary: '#0112c2',
    secondary: '#e4e5f2',
  },
});

export default MyPreset;
