import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step2Form } from "./Step2Form";
import { Step3Form } from "./Step3Form";
import { FullFormData, fullSchema } from "../schemas/schemas";
import { Step1Form } from "./Step1Form";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const methods = useForm<FullFormData>({
    resolver: zodResolver(fullSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      categories: [{ value: "" }],
      notifications: {
        email: false,
        push: false,
      },
      newsletter: false,
      rodo: false,
    },
  });

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  const handleStep1Complete = async () => {
    const isValid = await methods.trigger([
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ]);

    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handleStep2Complete = async () => {
    const isValid = await methods.trigger([
      "categories",
      "notifications",
      "newsletter",
    ]);

    if (isValid) {
      methods.clearErrors("root.serverError");
      setCurrentStep(3);
    }
  };

  const goToStep1 = () => {
    methods.clearErrors("root.serverError");
    setCurrentStep(1);
  };

  const goToStep2 = () => {
    methods.clearErrors("root.serverError");
    setCurrentStep(2);
  };

  return (
    <section
      aria-label="Formularz rejestracji"
      className="mx-auto w-full max-w-[540px] rounded-2xl border border-slate-300 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 dark:[&_input]:border-slate-700 dark:[&_input]:bg-slate-950 dark:[&_input]:text-slate-100 dark:[&_label]:text-slate-200 dark:[&_legend]:text-slate-200"
    >
      <nav aria-label="Postęp rejestracji" className="mb-4">
        <ol className="flex flex-wrap items-center justify-center gap-2 text-center text-sm text-slate-700 dark:text-slate-300">
          <li
            aria-current={currentStep === 1 ? "step" : undefined}
            className={currentStep === 1 ? "font-semibold text-[#1565C0]" : ""}
          >
            Krok 1 z 3 – Dane
          </li>
          <li aria-hidden="true" className="text-slate-400">
            →
          </li>
          <li
            aria-current={currentStep === 2 ? "step" : undefined}
            className={currentStep === 2 ? "font-semibold text-[#1565C0]" : ""}
          >
            Krok 2 z 3 – Preferencje
          </li>
          <li aria-hidden="true" className="text-slate-400">
            →
          </li>
          <li
            aria-current={currentStep === 3 ? "step" : undefined}
            className={currentStep === 3 ? "font-semibold text-[#1565C0]" : ""}
          >
            3 z 3 Podsumowanie
          </li>
        </ol>
      </nav>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mb-4 text-xl font-semibold text-slate-900 outline-none dark:text-slate-50"
      >
        {currentStep === 1 && "Dane osobowe"}
        {currentStep === 2 && "Preferencje"}
        {currentStep === 3 && "Podsumowanie"}
      </h2>

      <FormProvider {...methods}>
        {currentStep === 1 && <Step1Form onNext={handleStep1Complete} />}

        {currentStep === 2 && (
          <Step2Form onNext={handleStep2Complete} onBack={goToStep1} />
        )}

        {currentStep === 3 && (
          <Step3Form onBack={goToStep2} goToStep1={goToStep1} />
        )}
      </FormProvider>
    </section>
  );
}
