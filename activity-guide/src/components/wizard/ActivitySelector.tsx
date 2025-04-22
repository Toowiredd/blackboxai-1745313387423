import { useWizardStore } from '../../lib/store/wizardStore';
import type { ActivityType } from '../../lib/types/guide';
import { Compass } from 'lucide-react';

const activities: { type: ActivityType; description: string }[] = [
  {
    type: "Family Fishing - Beginners",
    description: "Perfect for families looking to start fishing together. Includes basic techniques and safety guidelines."
  },
  {
    type: "Bushwalk & Plant-ID",
    description: "Learn to identify local flora while enjoying a nature walk. Great for education and outdoor enthusiasts."
  },
  {
    type: "Kids Science Workshop",
    description: "Hands-on science experiments and activities designed for children. Safe and educational."
  },
  {
    type: "Nature Photography",
    description: "Capture the beauty of nature. Learn basic photography techniques and best practices."
  },
  {
    type: "Bird Watching",
    description: "Discover local bird species and learn bird watching techniques. Perfect for nature lovers."
  }
];

export function ActivitySelector() {
  const { activityType, setActivityType, nextStep } = useWizardStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="w-8 h-8 text-royal-marine" />
        <h2 className="text-2xl font-semibold">Choose Your Activity</h2>
      </div>

      <div className="grid gap-4">
        {activities.map((activity) => (
          <button
            key={activity.type}
            onClick={() => {
              setActivityType(activity.type);
              nextStep();
            }}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              activityType === activity.type
                ? 'border-royal-marine bg-royal-marine/5'
                : 'border-gray-200 hover:border-royal-marine/50'
            }`}
          >
            <h3 className="font-semibold text-lg mb-1">{activity.type}</h3>
            <p className="text-gray-600 dark:text-gray-300">{activity.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <div className="text-sm text-gray-500">
          Step 1 of 5
        </div>
        <button
          onClick={nextStep}
          disabled={!activityType}
          className={`btn-primary ${!activityType && 'opacity-50 cursor-not-allowed'}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
