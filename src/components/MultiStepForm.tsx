import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Step2Form } from "./Step2Form";
import { Step3Form } from "./Step3Form";
import { FullFormData, fullSchema } from "../schemas/schemas";
import { Step1Form } from "./Step1Form";
import { trackFormAbandonment } from "../analytics";

const steps = ["Dane", "Preferencje", "Podsumowanie"];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasInteractedRef = useRef(false);
  const submittedRef = useRef(false);
  const abandonmentSentRef = useRef(false);
  const currentStepRef = useRef(currentStep);
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
  const isDirty = methods.formState.isDirty;

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    if (isDirty) {
      hasInteractedRef.current = true;
    }
  }, [isDirty]);

  useEffect(() => {
    return () => {
      if (
        hasInteractedRef.current &&
        !submittedRef.current &&
        !abandonmentSentRef.current
      ) {
        trackFormAbandonment("registration", currentStepRef.current + 1);
        abandonmentSentRef.current = true;
      }
    };
  }, []);

  const handleStep1Complete = async () => {
    const isValid = await methods.trigger([
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ]);

    if (isValid) {
      setCurrentStep(1);
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
      setCurrentStep(2);
    }
  };

  const goToStep1 = () => {
    methods.clearErrors("root.serverError");
    setCurrentStep(0);
  };

  const goToStep2 = () => {
    methods.clearErrors("root.serverError");
    setCurrentStep(1);
  };

  return (
    <Paper
      component="section"
      aria-label="Formularz rejestracji"
      variant="outlined"
      sx={{ mx: "auto", width: "100%", maxWidth: 560, p: { xs: 2.5, sm: 3 } }}
    >
      <Box component="nav" aria-label="Postęp rejestracji" sx={{ mb: 3 }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Typography
        ref={headingRef}
        tabIndex={-1}
        component="h2"
        variant="h5"
        fontWeight={800}
        sx={{ mb: 2, outline: "none" }}
      >
        {currentStep === 0 && "Dane osobowe"}
        {currentStep === 1 && "Preferencje"}
        {currentStep === 2 && "Podsumowanie"}
      </Typography>

      <FormProvider {...methods}>
        {currentStep === 0 && <Step1Form onNext={handleStep1Complete} />}

        {currentStep === 1 && (
          <Step2Form onNext={handleStep2Complete} onBack={goToStep1} />
        )}

        {currentStep === 2 && (
          <Step3Form
            onBack={goToStep2}
            goToStep1={goToStep1}
            onComplete={() => {
              submittedRef.current = true;
            }}
          />
        )}
      </FormProvider>
    </Paper>
  );
}
