import React, { useState, useRef, useEffect } from "react";
import { Step2Form } from "./Step2Form";
import { Step3Form } from "./Step3Form";
import { Step1Data } from "../schemas/schemas";
import { Step1Form } from "./Step1Form";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<{
    step1?: Step1Data;
    step2?: any;
  }>({});

  const [emailError, setEmailError] = useState<string | undefined>();
  const [step3Data, setStep3Data] = useState<{ rodo: boolean } | undefined>();

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  const handleStep1Complete = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, step1: data }));
    setEmailError(undefined);
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: any) => {
    setFormData((prev) => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const goToStep1 = (error?: string) => {
    setEmailError(error);
    setCurrentStep(1);
  };

  const goToStep2 = () => setCurrentStep(2);

  return (
    <main aria-label="Formularz rejestracji" className="max-w-md mx-auto p-4">
      <nav aria-label="Postęp rejestracji" className="mb-4">
        <ol className="flex gap-2 text-sm text-gray-800">
          <li aria-current={currentStep === 1 ? "step" : undefined}>
            Krok 1 z 3 – Dane
          </li>
          <li aria-current={currentStep === 2 ? "step" : undefined}>
            Krok 2 z 3 – Preferencje
          </li>
          <li aria-current={currentStep === 3 ? "step" : undefined}>
            Krok 3 z 3 – Podsumowanie
          </li>
        </ol>
      </nav>

      <h2 ref={headingRef} tabIndex={-1} className="text-xl mb-4">
        {currentStep === 1 && "Dane osobowe"}
        {currentStep === 2 && "Preferencje"}
        {currentStep === 3 && "Podsumowanie"}
      </h2>

      {currentStep === 1 && (
        <Step1Form
          onNext={handleStep1Complete}
          defaultValues={formData.step1}
          externalError={emailError}
        />
      )}

      {currentStep === 2 && (
        <Step2Form
          onNext={handleStep2Complete}
          onBack={goToStep1}
          defaultValues={formData.step2}
        />
      )}

      {currentStep === 3 && formData.step1 && formData.step2 && (
        <Step3Form
          step1={formData.step1}
          step2={formData.step2}
          onBack={goToStep2}
          goToStep1={goToStep1}
          defaultValues={step3Data}
        />
      )}
    </main>
  );
}
