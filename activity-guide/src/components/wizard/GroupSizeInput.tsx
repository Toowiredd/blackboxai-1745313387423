import { useState } from 'react';
import { useWizardStore } from '../../lib/store/wizardStore';
import { Users, Minus, Plus } from 'lucide-react';

const MIN_GROUP_SIZE = 1;
const MAX_GROUP_SIZE = 50;

const groupSizePresets = [
  { size: 2, label: 'Couple' },
  { size: 4, label: 'Small Family' },
  { size: 6, label: 'Large Family' },
  { size: 10, label: 'Small Group' },
  { size: 20, label: 'Large Group' },
];

export function GroupSizeInput() {
  const { groupSize, setGroupSize, nextStep, previousStep } = useWizardStore();
  const [inputValue, setInputValue] = useState(groupSize?.toString() || '');

  const handleInputChange = (value: string) => {
    const numValue = parseInt(value);
    if (value === '') {
      setInputValue('');
      return;
    }
    if (isNaN(numValue)) return;
    
    if (numValue >= MIN_GROUP_SIZE && numValue <= MAX_GROUP_SIZE) {
      setInputValue(numValue.toString());
      setGroupSize(numValue);
    }
  };

  const adjustGroupSize = (increment: boolean) => {
    const currentSize = parseInt(inputValue) || 0;
    const newSize = increment ? currentSize + 1 : currentSize - 1;
    
    if (newSize >= MIN_GROUP_SIZE && newSize <= MAX_GROUP_SIZE) {
      setInputValue(newSize.toString());
      setGroupSize(newSize);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-royal-marine" />
        <h2 className="text-2xl font-semibold">How Many People?</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => adjustGroupSize(false)}
            disabled={!inputValue || parseInt(inputValue) <= MIN_GROUP_SIZE}
            className="p-2 rounded-full border-2 border-gray-200 hover:border-royal-marine
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-6 h-6" />
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-20 text-center text-2xl font-bold p-2 rounded-lg border-2
                     border-gray-200 focus:border-royal-marine focus:outline-none
                     dark:bg-gray-800 dark:border-gray-700"
            placeholder="#"
          />
          
          <button
            onClick={() => adjustGroupSize(true)}
            disabled={!inputValue || parseInt(inputValue) >= MAX_GROUP_SIZE}
            className="p-2 rounded-full border-2 border-gray-200 hover:border-royal-marine
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          {inputValue ? `${inputValue} ${parseInt(inputValue) === 1 ? 'person' : 'people'}` : 'Select group size'}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Select</h3>
          <div className="grid grid-cols-3 gap-2">
            {groupSizePresets.map(({ size, label }) => (
              <button
                key={size}
                onClick={() => {
                  setInputValue(size.toString());
                  setGroupSize(size);
                }}
                className="p-2 rounded-lg border border-gray-200 hover:border-royal-marine
                         hover:bg-royal-marine/5 transition-all dark:border-gray-700"
              >
                <div className="font-medium">{label}</div>
                <div className="text-sm text-gray-500">{size} people</div>
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
            Step 5 of 5
          </div>
        </div>
        <button
          onClick={nextStep}
          disabled={!groupSize}
          className={`btn-primary ${!groupSize && 'opacity-50 cursor-not-allowed'}`}
        >
          Review Guide
        </button>
      </div>
    </div>
  );
}
