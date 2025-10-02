interface StepCounterProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

export function StepCounter({ currentStep, totalSteps, stepNames }: StepCounterProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">
          Step {currentStep} of {totalSteps}
        </h3>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className="bg-dustyRose h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      {/* Step Names */}
      <div className="flex justify-between">
        {stepNames.map((name, index) => (
          <div key={index} className="text-center flex-1">
            <div className={`text-xs ${
              index + 1 <= currentStep 
                ? 'text-dustyRose font-medium' 
                : 'text-gray-400'
            }`}>
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
