import React from 'react';

export default function ReviewAndGenerate({ previousStep }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Review Your Selections</h2>
      <p>Review your selections and generate your guide.</p>
      <div className="mt-8 flex justify-start">
        <button
          onClick={previousStep}
          className="btn-secondary"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
