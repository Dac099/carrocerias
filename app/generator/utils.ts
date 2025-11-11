import { ClientDto } from "@/shared/dto/quoteform";

export function validateClientData(clientData: Partial<ClientDto>): {
  isValid: boolean;
  msgs: string[];
} {
  const validationData = {
    isValid: true,
    msgs: [] as string[],
  };

  if (!clientData.name) {
    validationData.msgs.push("El nombre del cliente es obligatorio.");
    validationData.isValid = false;
  }

  if (!clientData.email && !clientData.phone) {
    validationData.msgs.push(
      "Debe proporcionar al menos una forma de contacto"
    );
    validationData.isValid = false;
  }

  return validationData;
}
