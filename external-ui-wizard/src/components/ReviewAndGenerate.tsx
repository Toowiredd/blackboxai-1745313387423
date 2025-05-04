import React, { useState } from 'react';

export default function ReviewAndGenerate({ previousStep }) {
  const [generatedGuide, setGeneratedGuide] = useState(null);

  const handleGenerate = () => {
    const guide = {
      activityType: 'Sample Activity',
      skillLevel: 'Beginner',
      location: 'Sample Location',
      duration: '2 hours',
      groupSize: 5,
    };
    setGeneratedGuide(guide);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Review Your Selections</h2>

      {generatedGuide ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Generated Guide</h3>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {JSON.stringify(generatedGuide, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="space-y-4">
          <p>Review your selections and generate your guide.</p>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={previousStep}
          className="btn-secondary"
        >
          ← Back
        </button>
        <button
          onClick={handleGenerate}
          className="btn-primary"
        >
          Generate Guide
        </button>
      </div>
    </div>
  );
}
