import { useState } from 'react';
import { useWizardStore } from '../../lib/store/wizardStore';
import { MapPin, Search } from 'lucide-react';

const popularLocations = [
  "Port Phillip Bay",
  "Great Ocean Road",
  "Dandenong Ranges",
  "Yarra Valley",
  "Mornington Peninsula"
];

export function LocationInput() {
  const { location, setLocation, nextStep, previousStep } = useWizardStore();
  const [inputValue, setInputValue] = useState(location || '');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setLocation(inputValue.trim());
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-8 h-8 text-royal-marine" />
        <h2 className="text-2xl font-semibold">Where's Your Activity?</h2>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter location..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 
                     focus:border-royal-marine focus:outline-none transition-colors
                     dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Popular Locations</h3>
          <div className="grid grid-cols-2 gap-2">
            {popularLocations.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setInputValue(loc);
                  setLocation(loc);
                  nextStep();
                }}
                className="p-2 text-left rounded-lg border border-gray-200 
                         hover:border-royal-marine hover:bg-royal-marine/5 
                         transition-all dark:border-gray-700"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
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
            Step 3 of 5
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim()}
          className={`btn-primary ${!inputValue.trim() && 'opacity-50 cursor-not-allowed'}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
