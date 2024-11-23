import { create } from 'zustand';

interface SearchState {
  searchPlace: string;
  searchDate: Date;
  serachTime: string[];
  searchPeople: number;
  setPlace: (place: string) => void;
  setDate: (date: Date) => void;
  setTime: (time: string[]) => void;
  setPeople: (people: number) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchPlace: '',
  searchDate: new Date(),
  serachTime: [],
  searchPeople: 1,
  setPlace: (searchPlace) => set({ searchPlace }),
  setDate: (searchDate) => set({ searchDate }),
  setTime: (serachTime) => set({ serachTime }),
  setPeople: (searchPeople) => set({ searchPeople }),
}));

export default useSearchStore;
