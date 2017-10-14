import { Platform } from 'react-native';
import head from 'lodash/head';
import slice from 'lodash/slice';

// How many images to pre fetch
const PREFETCH_IMAGES = 5;

// API URL
const API = Platform.OS === 'android'
  ? 'http://10.0.3.2:3000' // Localhost ip address when running on Android (Genymotion)
  : 'http://localhost:3000';

// initial state
export const initialState = {
  image: null,
  next: [],
};

