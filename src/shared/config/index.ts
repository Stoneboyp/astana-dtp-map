const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return import.meta.env[key];
};

export const API_URLS = {
  DTP: getEnvVar('VITE_DTP_URL'),
  CITY_AREA: getEnvVar('VITE_CITY_AREA_URL'),
};

export const MAP_SETTINGS = {
  ASTANA_VIEW: {
    latitude: Number(getEnvVar('VITE_ASTANA_LAT')),
    longitude: Number(getEnvVar('VITE_ASTANA_LON')),
    zoom: Number(getEnvVar('VITE_ASTANA_ZOOM')),
  },
};