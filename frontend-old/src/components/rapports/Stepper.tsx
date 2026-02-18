import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                  transition-all duration-300
                  ${
                    index < currentStep
                      ? 'bg-green-500 text-white shadow-lg'
                      : index === currentStep
                      ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {index < currentStep ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`
                    text-sm font-semibold
                    ${
                      index <= currentStep
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 hidden md:block max-w-[120px]">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-1 mx-4 transition-all duration-300
                  ${
                    index < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
