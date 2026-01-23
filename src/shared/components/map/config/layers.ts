export const MAP_LAYERS_CONFIG = {
  cityArea: {
    id: "cityArea",
    label: "Граница города",
  },
  dtpPoints: {
    id: "dtpPoints",
    label: "Точки ДТП",
  },
} as const;

export type LayerId = keyof typeof MAP_LAYERS_CONFIG;
