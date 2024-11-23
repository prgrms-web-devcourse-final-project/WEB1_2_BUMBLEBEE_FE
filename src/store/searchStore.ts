import { create } from 'zustand';

interface SearchState {
  searchPlace: string;
  searchDate: Date;
  searchTime: string[];
  searchPeople: number;
  setPlace: (place: string) => void;
  setDate: (date: Date) => void;
  setTime: (time: string[]) => void;
  setPeople: (people: number) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchPlace: '',
  searchDate: new Date(),
  searchTime: [],
  searchPeople: 0,
  setPlace: (searchPlace) => set({ searchPlace }),
  setDate: (searchDate) => set({ searchDate }),
  setTime: (searchTime) => set({ searchTime }),
  setPeople: (searchPeople) => set({ searchPeople }),
}));

export default useSearchStore;
