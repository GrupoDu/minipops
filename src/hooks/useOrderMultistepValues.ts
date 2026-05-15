import { JSX, useState } from "react";
import { useRouter } from "next/navigation";

const useOrderMultistepValues = (
  elements: JSX.Element[],
  handleSubmit: () => void,
) => {
  const [step, setStep] = useState<number>(0);
  const router = useRouter();
  const elementLength = elements.length;

  const nextStep = () => {
    if (step === elementLength - 1) {
      handleSubmit();
      return;
    }
    setStep((prevState) => prevState + 1);
  };
  const prevStep = () => {
    if (step < 1) {
      router.push("/pedidos");
      return;
    }
    setStep((prevState) => prevState - 1);
  };

  return {
    step,
    nextStep,
    prevStep,
    CurrentComponent: elements[step],
  };
};

export default useOrderMultistepValues;
