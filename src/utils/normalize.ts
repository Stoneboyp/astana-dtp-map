interface DtpInfo {
  id: string | number;
  date: string;
  time: string;
  reason: string;
  surface: string;
  coordinates: [number, number];
}

export const normalizeDtpData = (feature: any): DtpInfo => {
  const p = feature.properties || {};
  return {
    id: feature.id || p.objectid,
    date: p.rta_date ? new Date(p.rta_date).toLocaleDateString("ru-RU") : "—",
    time: p.fd1r05p1 || "—",
    reason: p.fd1r09p1 || "",
    surface: p.fd1r071p1 || "",
    coordinates: feature.coordinates,
  };
};
