import React from "react";

export interface TimelineStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export function Timeline({ steps }: TimelineProps) {
  return (
    <div className="relative border-l border-gray-200 ml-3 md:ml-4">
      {steps.map((step, index) => (
        <div key={index} className="mb-8 ml-6 last:mb-0">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white text-blue-600">
            {step.icon ? (
              step.icon
            ) : (
              <span className="text-sm font-bold">{index + 1}</span>
            )}
          </span>
          <h3 className="flex items-center mb-1 text-lg font-bold text-gray-900">
            {step.title}
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
