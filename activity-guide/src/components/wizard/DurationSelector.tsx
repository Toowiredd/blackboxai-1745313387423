import { useWizardStore } from '../../lib/store/wizardStore';
import type { Duration } from '../../lib/types/guide';
import { Clock } from 'lucide-react';

const durations: { value: Duration; description: string }[] = [
  {
    value: "2 hours",
    description: "Perfect for a quick activity or introduction to something new."
  },
  {
    value: "half-day",
    description: "Ideal for more comprehensive activities and learning experiences."
  },
  {
    value: "full-day",
    description: "Complete immersion with breaks and multiple activities included."
  },
  {
    value: "weekend",
    description: "Extended experience with overnight stays and multiple sessions."
  }
];

export function DurationSelector() {
  const { duration, setDuration, nextStep, previousStep } = useWizardStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-8 h-8 text-royal-marine" />
        <h2 className="text-2xl font-semibold">How Long Is Your Activity?</h2>
      </div>

      <div className="grid gap-4">
        {durations.map((dur) => (
          <button
            key={dur.value}
            onClick={() => {
              setDuration(dur.value);
              nextStep();
            }}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              duration === dur.value
                ? 'border-royal-marine bg-royal-marine/5'
                : 'border-gray-200 hover:border-royal-marine/50 dark:border-gray-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{dur.value}</h3>
              <Clock 
                className={`w-5 h-5 ${
                  duration === dur.value 
                    ? 'text-royal-marine' 
                    : 'text-gray-400'
                }`} 
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{dur.description}</p>
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
            Step 4 of 5
          </div>
        </div>
        <button
          onClick={nextStep}
          disabled={!duration}
          className={`btn-primary ${!duration && 'opacity-50 cursor-not-allowed'}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
