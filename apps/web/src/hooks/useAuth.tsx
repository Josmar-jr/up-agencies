import { atom, useAtom } from "jotai";

export type Step = "personal" | "agency";
export const stepAtom = atom<Step>("personal");

export function useSignUpStep() {
  const [currentStep, setCurrentStep] = useAtom(stepAtom);

  return {
    currentStep,
    onChangeCurrentStep: setCurrentStep,
  };
}
