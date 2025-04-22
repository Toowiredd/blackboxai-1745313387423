import React from 'react';

export default function GroupSizeInput({ nextStep, previousStep }) {
  const [groupSize, setGroupSize] = React.useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Enter Group Size</h2>
      <input
        type="number"
        min="1"
        value={groupSize}
        onChange={(e) => setGroupSize(e.target.value)}
        placeholder="Number of people"
        className="w-full p-4 border-2 rounded-lg border-gray-300 focus:border-blue-600 focus:outline-none"
      />
      <div className="mt-8 flex justify-between">
        <button
          onClick={previousStep}
          className="btn-secondary"
        >
          ← Back
        </button>
        <button
          onClick={() => groupSize && nextStep()}
          disabled={!groupSize}
          className={`btn-primary ${!groupSize ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
