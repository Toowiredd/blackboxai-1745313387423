import { useWizardStore } from '../../lib/store/wizardStore';
import { ActivitySelector } from './ActivitySelector';
import { SkillLevelSelector } from './SkillLevelSelector';
import { LocationInput } from './LocationInput';
import { DurationSelector } from './DurationSelector';
import { GroupSizeInput } from './GroupSizeInput';
import { ReviewAndGenerate } from './ReviewAndGenerate';
import { motion, AnimatePresence } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => (
  <div className="flex justify-center mb-8">
    {Array.from({ length: totalSteps }).map((_, index) => (
      <div
        key={index}
        className={`h-2 w-12 rounded-full mx-1 transition-colors ${
          index === currentStep
            ? 'bg-royal-marine'
            : index < currentStep
            ? 'bg-copper'
            : 'bg-gray-200 dark:bg-gray-700'
        }`}
      />
    ))}
  </div>
);

const slideAnimation = {
  initial: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -20 : 20,
    opacity: 0
  }),
  transition: {
    duration: 0.3
  }
};

export function Wizard() {
  const currentStep = useWizardStore(state => state.currentStep);
  const totalSteps = 6; // Including review step

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ActivitySelector />;
      case 1:
        return <SkillLevelSelector />;
      case 2:
        return <LocationInput />;
      case 3:
        return <DurationSelector />;
      case 4:
        return <GroupSizeInput />;
      case 5:
        return <ReviewAndGenerate />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {currentStep < 5 && (
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps - 1} />
      )}
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          custom={currentStep}
          variants={slideAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-[400px]"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Implementation Status:
// 1. ActivitySelector (done)
// 2. SkillLevelSelector (done)
// 3. LocationInput (done)
// 4. DurationSelector (done)
// 5. GroupSizeInput (done)
// 6. ReviewAndGenerate (done)
// Next: Implement guide generation and display
