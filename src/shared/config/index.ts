const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return value;
};

export const API_URLS = {
  DTP: getEnvVar("VITE_DTP_URL"),
  CITY_AREA: getEnvVar("VITE_CITY_AREA_URL"),
};

export const MAP_SETTINGS = {
  ASTANA_VIEW: {
    latitude: Number(getEnvVar("VITE_ASTANA_LAT")),
    longitude: Number(getEnvVar("VITE_ASTANA_LON")),
    zoom: Number(getEnvVar("VITE_ASTANA_ZOOM")),
  },
  STYLE: getEnvVar("VITE_MAP_STYLE"),
};
