import { create } from 'zustand';

interface SearchState {
  searchPlace: string;
  searchDate: Date;
  searchTime: string[];
  formattedTime: string[];
  searchPeople: number;
  setPlace: (place: string) => void;
  setDate: (date: Date) => void;
  setTime: (time: string[]) => void;
  setFormattedTime: (time: string[]) => void;
  setPeople: (people: number) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchPlace: '',
  searchDate: new Date(),
  searchTime: [],
  searchPeople: 0,
  formattedTime: [],
  setPlace: (searchPlace) => set({ searchPlace }),
  setDate: (searchDate) => set({ searchDate }),
  setTime: (searchTime) => set({ searchTime }),
  setFormattedTime: (formattedTime) => set({ formattedTime }),
  setPeople: (searchPeople) => set({ searchPeople }),
}));

export default useSearchStore;
