"use client";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import {
  QuoteFormDto,
  ClientDto,
  BodytruckDto,
  ServiceDto,
} from "@/shared/dto/quoteform";
import ClientForm from "./_components/clientForm";
import ProductsForm from "./_components/productsForm";

export default function Page() {
  //Hooks
  const stepperRef = useRef<Stepper>(null);
  const [formData, setFormData] = useState<Partial<QuoteFormDto>>();

  //Handlers and functions
  function setFormClientData(clientData: ClientDto) {
    setFormData({ ...formData, client: clientData });
  }

  function setFormItemsData(
    bodytrucks: BodytruckDto[],
    services: ServiceDto[]
  ) {
    setFormData({ ...formData, items: { bodytrucks, services } });
  }

  const nextStep = () => stepperRef.current?.nextCallback();
  const prevStep = () => stepperRef.current?.prevCallback();

  return (
    <article>
      <Stepper
        ref={stepperRef}
        orientation="vertical"
        className="max-w-5xl mx-auto"
      >
        <StepperPanel header="Cliente">
          <ClientForm
            nextStep={nextStep}
            setClientFormData={setFormClientData}
          />
        </StepperPanel>

        <StepperPanel header="Productos">
          <ProductsForm
            prevStep={prevStep}
            nextStep={nextStep}
            setFormData={setFormItemsData}
          />
        </StepperPanel>

        <StepperPanel header="Notas para el cliente">
          <section></section>
          <section className="flex justify-end px-2 gap-3">
            <Button
              icon="pi pi-arrow-left"
              onClick={prevStep}
              className="h-10"
            />

            <Button
              icon="pi pi-arrow-right"
              onClick={nextStep}
              className="h-10"
            />
          </section>
        </StepperPanel>

        <StepperPanel header="Notas internas">
          <section></section>
          <section className="flex justify-end px-2 gap-3">
            <Button
              icon="pi pi-arrow-left"
              onClick={prevStep}
              className="h-10"
            />

            <Button
              icon="pi pi-arrow-right"
              onClick={nextStep}
              className="h-10"
            />
          </section>
        </StepperPanel>

        <StepperPanel header="Resumen">
          <section></section>
          <section className="flex justify-end px-2 gap-3">
            <Button
              icon="pi pi-arrow-left"
              onClick={prevStep}
              className="h-10"
            />

            <Button label="Generar" className="h-10" />
          </section>
        </StepperPanel>
      </Stepper>
    </article>
  );
}
