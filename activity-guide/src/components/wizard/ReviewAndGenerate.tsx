import { useWizardStore } from '../../lib/store/wizardStore';
import { ClipboardCheck, Edit2, FileText } from 'lucide-react';

interface ReviewItemProps {
  label: string;
  value: string | number | null;
  icon: React.ReactNode;
  onEdit: () => void;
}

const ReviewItem = ({ label, value, icon, onEdit }: ReviewItemProps) => (
  <div className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-3">
      <div className="text-royal-marine">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        <div className="font-medium">{value || 'Not set'}</div>
      </div>
    </div>
    <button
      onClick={onEdit}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
      aria-label={`Edit ${label.toLowerCase()}`}
    >
      <Edit2 className="w-4 h-4" />
    </button>
  </div>
);

export function ReviewAndGenerate() {
  const {
    activityType,
    skillLevel,
    location,
    duration,
    groupSize,
    resetWizard,
    currentStep,
  } = useWizardStore();

  const handleGenerate = () => {
    // This will be implemented when we add the guide generation logic
    console.log('Generating guide with:', {
      activityType,
      skillLevel,
      location,
      duration,
      groupSize,
    });
  };

  const goToStep = (step: number) => {
    useWizardStore.setState({ currentStep: step });
  };

  const allFieldsComplete = 
    activityType && 
    skillLevel && 
    location && 
    duration && 
    groupSize;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardCheck className="w-8 h-8 text-royal-marine" />
        <h2 className="text-2xl font-semibold">Review Your Selections</h2>
      </div>

      <div className="space-y-4">
        <ReviewItem
          label="Activity Type"
          value={activityType}
          icon={<FileText className="w-5 h-5" />}
          onEdit={() => goToStep(0)}
        />
        <ReviewItem
          label="Skill Level"
          value={skillLevel}
          icon={<FileText className="w-5 h-5" />}
          onEdit={() => goToStep(1)}
        />
        <ReviewItem
          label="Location"
          value={location}
          icon={<FileText className="w-5 h-5" />}
          onEdit={() => goToStep(2)}
        />
        <ReviewItem
          label="Duration"
          value={duration}
          icon={<FileText className="w-5 h-5" />}
          onEdit={() => goToStep(3)}
        />
        <ReviewItem
          label="Group Size"
          value={groupSize ? `${groupSize} ${groupSize === 1 ? 'person' : 'people'}` : null}
          icon={<FileText className="w-5 h-5" />}
          onEdit={() => goToStep(4)}
        />
      </div>

      <div className="mt-8 space-y-4">
        {!allFieldsComplete && (
          <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            Please complete all fields before generating your guide.
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGenerate}
            disabled={!allFieldsComplete}
            className={`btn-primary flex-1 ${!allFieldsComplete && 'opacity-50 cursor-not-allowed'}`}
          >
            Generate Guide
          </button>
          <button
            onClick={resetWizard}
            className="btn-secondary"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
