import { useWizardStore } from '../../lib/store/wizardStore';
import type { SkillLevel } from '../../lib/types/guide';
import { GraduationCap } from 'lucide-react';

const skillLevels: { level: SkillLevel; description: string }[] = [
  {
    level: "Beginner",
    description: "No prior experience needed. We'll cover all the basics step by step."
  },
  {
    level: "Intermediate",
    description: "Some experience required. We'll build on fundamental knowledge."
  },
  {
    level: "Advanced",
    description: "Experienced participants. We'll cover complex techniques and deeper insights."
  }
];

export function SkillLevelSelector() {
  const { skillLevel, setSkillLevel, nextStep, previousStep } = useWizardStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="w-8 h-8 text-royal-marine" />
        <h2 className="text-2xl font-semibold">Select Skill Level</h2>
      </div>

      <div className="grid gap-4">
        {skillLevels.map((skill) => (
          <button
            key={skill.level}
            onClick={() => {
              setSkillLevel(skill.level);
              nextStep();
            }}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              skillLevel === skill.level
                ? 'border-royal-marine bg-royal-marine/5'
                : 'border-gray-200 hover:border-royal-marine/50'
            }`}
          >
            <h3 className="font-semibold text-lg mb-1">{skill.level}</h3>
            <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={previousStep}
            className="text-gray-600 hover:text-royal-marine transition-colors"
          >
            ← Back
          </button>
          <div className="text-sm text-gray-500">
            Step 2 of 5
          </div>
        </div>
        <button
          onClick={nextStep}
          disabled={!skillLevel}
          className={`btn-primary ${!skillLevel && 'opacity-50 cursor-not-allowed'}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
