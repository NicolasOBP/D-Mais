// eslint-disable-next-line import/named
import { FormState } from "react-hook-form";

function isFormValid<T extends Record<string, any>>(
  formState: FormState<T>,
): boolean {
  // Helper function to deeply search for a 'message' property
  const hasErrorMessage = (obj: any): boolean => {
    if (!obj || typeof obj !== "object") return false;

    // If we found a error object with a message, return true
    if ("message" in obj && typeof obj.message === "string") {
      return true;
    }

    // Otherwise, look deeper into the nested objects
    return Object.values(obj).some((value) => hasErrorMessage(value));
  };

  // If there are ANY messages inside the errors object, the form is INVALID.
  // We negate it (!) because you want to return true if the form IS valid.
  return hasErrorMessage(formState.errors);
}

function getFirstErrorMessage(errorObj: any): string | undefined {
  if (!errorObj) return undefined;

  // Se o próprio objeto já tiver uma message (string), retorna ela
  if (typeof errorObj.message === "string") {
    return errorObj.message;
  }

  // Caso contrário, percorre as propriedades internas (name, corporateReason, etc.)
  for (const key in errorObj) {
    if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
      const result = getFirstErrorMessage(errorObj[key]);
      if (result) return result; // Retorna a primeira mensagem que encontrar
    }
  }

  return undefined;
}

export const useFormUtils = {
  isFormValid,
  getFirstErrorMessage,
};
