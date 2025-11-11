"use client";

import { ClientDto } from "@/shared/dto/quoteform";
import { useQuery } from '@tanstack/react-query';
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { SelectItemOptionsType } from "primereact/selectitem";
import { useState } from "react";
import { getClients } from '../actions';
import { validateClientData } from '../utils';
import { Message } from 'primereact/message';

type Props = {
  nextStep: () => void;
  setClientFormData: (clientData: ClientDto) => void;
};

type ValidClient = {
  isValid: boolean;
  msgs: string[];
};

export default function ClientForm({ nextStep, setClientFormData }: Props) {
  const [clientData, setClientData] = useState<Partial<ClientDto> | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientDto | null>(null);
  const [isValidClientData, setIsValidClientData] = useState<ValidClient>({ isValid: true, msgs: [] });

  const result = useQuery({
    queryKey: ["minimalClients"],
    queryFn: getClients,
  });

  function getClientOptions(): SelectItemOptionsType {
    if (!result.data) return [];

    return result.data.map((client) => ({
      label: `${client.name} (${client.company})`,
      value: client,
    }));
  }

  function setClientProperty(property: string, value: string) {
    switch (property) {
      case "name":
        setClientData({ ...clientData, name: value });
        break;
      case "phone":
        setClientData({ ...clientData, phone: value });
        break;
      case "email":
        setClientData({ ...clientData, email: value });
        break;
      case "company":
        setClientData({ ...clientData, company: value });
    }
  }

  function nextClientBtnHandler() {
    const validation = validateClientData(clientData || {});
    setIsValidClientData(validation);

    if (validation.isValid) {
      setClientFormData(clientData as ClientDto);
      nextStep();
    }
  }

  return (
    <>
      <section className="pr-2">
        <Dropdown
          className="mt-2 w-full sm:w-1/2"
          placeholder="Selecciona un cliente"
          disabled={
            result.isPending || result.isError || result.data.length === 0
          }
          options={getClientOptions()}
          value={selectedClient}
          onChange={(e) => {
            setSelectedClient(e.value);
            setClientData(e.value);
          }}
          checkmark={true}
        />

        <FloatLabel className="mt-8">
          <InputText
            id="clientName"
            name="clientName"
            className="w-full sm:w-1/2"
            value={clientData?.name}
            onChange={(e) => setClientProperty("name", e.target.value)}
          />
          <label htmlFor="clientName">Nombre</label>
        </FloatLabel>

        <FloatLabel className="mt-8">
          <InputText
            id="clientCompany"
            name="clientCompany"
            className="w-full sm:w-1/2"
            value={clientData?.company}
            onChange={(e) => setClientProperty("company", e.target.value)}
          />
          <label htmlFor="clientCompany">Compañía</label>
        </FloatLabel>

        <FloatLabel className="mt-8">
          <InputMask
            id="clientPhone"
            name="clientPhone"
            mask="(+52) 99 9999 9999"
            className="w-full sm:w-1/2"
            value={clientData?.phone}
            onChange={(e) =>
              setClientProperty("phone", e.target.value as string)
            }
          />
          <label htmlFor="clientPhone">Teléfono</label>
        </FloatLabel>

        <FloatLabel className="mt-8">
          <InputText
            id="clientEmail"
            name="clientEmail"
            className="w-full sm:w-1/2"
            value={clientData?.email}
            onChange={(e) => setClientProperty("email", e.target.value)}
          />
          <label htmlFor="clientEmail">Email</label>
        </FloatLabel>
      </section>
      {isValidClientData.msgs.length > 0 && (
        <section className="pr-2 flex flex-col gap-2 mt-2">
          {isValidClientData.msgs.map((msg, index) => (
            <Message
              key={index}
              severity="error"
              text={msg}
              className="text-xs w-full sm:w-1/2"
            />
          ))}
        </section>
      )}
      <section className="flex justify-end p-2">
        <Button
          icon="pi pi-arrow-right"
          onClick={nextClientBtnHandler}
          className="h-10"
        />
      </section>
    </>
  );
}
