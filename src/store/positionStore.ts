import { CenterPosition, MapPosition, Position } from '@typings/types';
import { create } from 'zustand';

interface PositionState {
  mapPosition: MapPosition;
  nowPosition: Position;
  centerPosition: CenterPosition;
  setMapPosition: (mapPosition: MapPosition) => void;
  setNowPosition: (nowPosition: Position) => void;
  setCenterPosition: (centerPosition: CenterPosition) => void;
  isInitialized: boolean;
  initializeCenterPosition: () => void;
}

const usePositionStore = create<PositionState>((set) => ({
  mapPosition: {
    topRight: { lat: 0, lng: 0 },
    bottomLeft: { lat: 0, lng: 0 },
  },
  nowPosition: {
    center: {
      lat: 37.496486063,
      lng: 127.028361548,
    },
    isLoading: true,
  },
  centerPosition: {
    lat: 37.496486063,
    lng: 127.028361548,
  },
  setMapPosition: (mapPosition) => set({ mapPosition }),
  setNowPosition: (nowPosition) => set({ nowPosition }),
  setCenterPosition: (centerPosition) => set({ centerPosition }),
  isInitialized: false,
  initializeCenterPosition: () =>
    set((state) => {
      if (!state.isInitialized) {
        return {
          centerPosition: state.nowPosition.center,
          isInitialized: true,
        };
      }
      return state;
    }),
}));

export default usePositionStore;
