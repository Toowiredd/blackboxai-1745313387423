import React, { useState } from 'react';
import ActivitySelector from './ActivitySelector';
import SkillLevelSelector from './SkillLevelSelector';
import LocationInput from './LocationInput';
import DurationSelector from './DurationSelector';
import GroupSizeInput from './GroupSizeInput';
import ReviewAndGenerate from './ReviewAndGenerate';

const steps = [
  ActivitySelector,
  SkillLevelSelector,
  LocationInput,
  DurationSelector,
  GroupSizeInput,
  ReviewAndGenerate,
];

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const StepComponent = steps[currentStep];

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <StepComponent nextStep={nextStep} previousStep={previousStep} />
    </div>
  );
}
