import React from 'react';

export default function LocationInput({ nextStep, previousStep }) {
  const [location, setLocation] = React.useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Enter Location</h2>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
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
          onClick={() => location && nextStep()}
          disabled={!location}
          className={`btn-primary ${!location ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
