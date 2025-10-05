interface StepCounterProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

export function StepCounter({ currentStep, totalSteps, stepNames }: StepCounterProps) {
  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="w-full bg-dustyRose/20 rounded-full h-3 mb-6">
        <div 
          className="bg-gradient-to-r from-skyBlue to-sageGreen h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      {/* Step Names with Visual Breaks */}
      <div className="flex justify-between relative">
        {/* Connecting Lines */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-dustyRose/20 -z-10"></div>
        
        {stepNames.map((name, index) => (
          <div key={index} className="text-center flex-1 relative">
            {/* Step Circle */}
            <div className={`w-8 h-8 mx-auto mb-3 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              index + 1 <= currentStep 
                ? 'bg-gradient-to-r from-skyBlue to-sageGreen text-white shadow-md' 
                : 'bg-dustyRose/20 text-dustyRose/60'
            }`}>
              {index + 1}
            </div>
            
            {/* Step Name */}
            <div className={`text-sm font-medium transition-colors ${
              index + 1 <= currentStep 
                ? 'text-sageGreen' 
                : 'text-dustyRose/60'
            }`}>
              {name}
            </div>
            
            {/* Step Description */}
            <div className={`text-xs mt-1 transition-colors ${
              index + 1 <= currentStep 
                ? 'text-dustyRose/70' 
                : 'text-dustyRose/40'
            }`}>
              {index === 0 && 'Basic Info'}
              {index === 1 && 'Organization'}
              {index === 2 && 'Content'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
