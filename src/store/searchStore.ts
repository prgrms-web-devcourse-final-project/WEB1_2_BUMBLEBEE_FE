import { create } from 'zustand';

interface SearchState {
  searchPlace: string;
  searchDate: Date;
  searchTime: string[];
  formattedTime: string[];
  searchPeople: number;
  searchAddress: string;
  setPlace: (place: string) => void;
  setDate: (date: Date) => void;
  setTime: (time: string[]) => void;
  setFormattedTime: (time: string[]) => void;
  setPeople: (people: number) => void;
  setAddress: (address: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchPlace: '',
  searchDate: new Date(),
  searchTime: [],
  searchPeople: 0,
  formattedTime: [],
  searchAddress: '',
  setPlace: (searchPlace) => set({ searchPlace }),
  setDate: (searchDate) => set({ searchDate }),
  setTime: (searchTime) => set({ searchTime }),
  setFormattedTime: (formattedTime) => set({ formattedTime }),
  setPeople: (searchPeople) => set({ searchPeople }),
  setAddress: (searchAddress) => set({ searchAddress }),
}));

export default useSearchStore;
