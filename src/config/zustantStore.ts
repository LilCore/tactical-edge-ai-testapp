import { User } from '@/types/userTypes';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  user?: User;
};

type Actions = {
  setUser: (user: User) => void;
};

const useStore = create(
  immer<State & Actions>((set) => ({
    user: undefined,
    setUser: (user: User) =>
      set((state) => {
        state.user = user;
      }),
  })),
);

export default useStore;
