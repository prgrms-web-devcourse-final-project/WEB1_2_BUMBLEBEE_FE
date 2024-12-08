import { getAuthToken } from '@utils/auth';
import { create } from 'zustand';

interface StoreState {
  isLogin: boolean;
  storeLogin: () => void;
  storeLogout: () => void;
}

const useAuthStore = create<StoreState>((set) => ({
  isLogin: !!getAuthToken(),
  storeLogin: () => set({ isLogin: true }),
  storeLogout: () => set({ isLogin: false }),
}));

export default useAuthStore;
