import { makeAutoObservable } from "mobx";

export type SelectedDtpPoint = {
  id: number;
  coordinates: [number, number];
};

class MapUiStore {
  selectedPoint: SelectedDtpPoint | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedPoint(point: SelectedDtpPoint) {
    this.selectedPoint = point;
  }

  clearSelectedPoint() {
    this.selectedPoint = null;
  }
}

export const mapUiStore = new MapUiStore();
