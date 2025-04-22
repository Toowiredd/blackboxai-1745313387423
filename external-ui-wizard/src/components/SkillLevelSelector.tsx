import React from 'react';

const skillLevels = [
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

export default function SkillLevelSelector({ nextStep, previousStep }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Select Skill Level</h2>
      <div className="grid gap-4">
        {skillLevels.map((skill) => (
          <button
            key={skill.level}
            onClick={() => setSelected(skill.level)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selected === skill.level
                ? 'border-blue-600 bg-blue-100'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <h3 className="font-semibold text-lg mb-1">{skill.level}</h3>
            <p className="text-gray-600">{skill.description}</p>
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
