import create from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usePersistStore = create(
  persist(
    set => ({
      isOnboardingDone: false,
      isRehydrated: false,

      setIsOnboardingDone: val =>
        set(() => ({
          isOnboardingDone: val,
        })),
      setHasHydrated: state => {
        set({
          isRehydrated: state,
        });
      },
    }),
    {
      name: 'onBoarding-status',
      getStorage: () => AsyncStorage,
      onRehydrateStorage: () => state => {
        state.setHasHydrated(true);
      },
    },
  ),
);
