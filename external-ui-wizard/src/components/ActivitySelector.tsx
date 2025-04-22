import React from 'react';

const activities = [
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

export default function ActivitySelector({ nextStep }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Choose Your Activity</h2>
      <div className="grid gap-4">
        {activities.map((activity) => (
          <button
            key={activity.type}
            onClick={() => setSelected(activity.type)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selected === activity.type
                ? 'border-blue-600 bg-blue-100'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <h3 className="font-semibold text-lg mb-1">{activity.type}</h3>
            <p className="text-gray-600">{activity.description}</p>
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => selected && nextStep()}
          disabled={!selected}
          className={`btn-primary ${!selected ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
