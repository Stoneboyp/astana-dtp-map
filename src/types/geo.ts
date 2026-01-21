/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GeoJsonFeature<TGeometry = any, TProperties = any> {
  type: "Feature";
  geometry: TGeometry;
  properties: TProperties;
  id?: number | string;
}

export interface GeoJsonFeatureCollection<TGeometry = any, TProperties = any> {
  type: "FeatureCollection";
  features: GeoJsonFeature<TGeometry, TProperties>[];
}
