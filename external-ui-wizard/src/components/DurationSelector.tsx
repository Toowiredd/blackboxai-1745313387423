import React from 'react';

const durations = [
  { label: '30 minutes', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: 'Half day', value: 240 },
  { label: 'Full day', value: 480 },
];

export default function DurationSelector({ nextStep, previousStep }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Select Duration</h2>
      <div className="grid gap-4">
        {durations.map((duration) => (
          <button
            key={duration.value}
            onClick={() => setSelected(duration.value)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selected === duration.value
                ? 'border-blue-600 bg-blue-100'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            {duration.label}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={previousStep}
          className="btn-secondary"
        >
          ← Back
        </button>
        <button
          onClick={() => selected !== null && nextStep()}
          disabled={selected === null}
          className={`btn-primary ${selected === null ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
