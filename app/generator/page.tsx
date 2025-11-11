"use client";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { QuoteFormDto, ClientDto } from "@/shared/dto/quoteform";
import ClientForm from './_components/clientForm';

export default function Page() {
  //Hooks
  const stepperRef = useRef<Stepper>(null);
  const [formData, setFormData] = useState<Partial<QuoteFormDto>>();

  //Handlers and functions
  function setFormClientData(clientData: ClientDto) {
    setFormData({ ...formData, client: clientData });
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
