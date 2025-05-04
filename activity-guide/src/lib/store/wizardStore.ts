import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { WizardState, ActivityType, SkillLevel, Duration } from '../types/guide';

interface WizardStore extends WizardState {
  setActivityType: (type: ActivityType) => void;
  setSkillLevel: (level: SkillLevel) => void;
  setLocation: (location: string) => void;
  setDuration: (duration: Duration) => void;
  setGroupSize: (size: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetWizard: () => void;
  generateGuide: () => void;
}

const initialState: WizardState = {
  activityType: null,
  skillLevel: null,
  location: null,
  duration: null,
  groupSize: null,
  currentStep: 0,
  generatedGuide: null,
};

export const useWizardStore = create<WizardStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setActivityType: (type) => 
          set((state) => ({ ...state, activityType: type })),

        setSkillLevel: (level) => 
          set((state) => ({ ...state, skillLevel: level })),

        setLocation: (location) => 
          set((state) => ({ ...state, location })),

        setDuration: (duration) => 
          set((state) => ({ ...state, duration })),

        setGroupSize: (size) => 
          set((state) => ({ ...state, groupSize: size })),

        nextStep: () => 
          set((state) => ({ ...state, currentStep: state.currentStep + 1 })),

        previousStep: () => 
          set((state) => ({ ...state, currentStep: Math.max(0, state.currentStep - 1) })),

        resetWizard: () => 
          set(initialState),

        generateGuide: () => {
          const { activityType, skillLevel, location, duration, groupSize } = get();
          const guide = {
            activityType,
            skillLevel,
            location,
            duration,
            groupSize,
          };
          set({ generatedGuide: guide });
        },
      }),
      {
        name: 'activity-guide-wizard',
        skipHydration: false,
      }
    )
  )
);

// Selector hooks for specific state slices
export const useWizardStep = () => useWizardStore((state) => state.currentStep);
export const useWizardActivity = () => useWizardStore((state) => state.activityType);
export const useWizardLocation = () => useWizardStore((state) => state.location);
