"use client";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef } from "react";
import { Button } from "primereact/button";

export default function Page() {
  const stepperRef = useRef<Stepper>(null);

  const nextStep = () => stepperRef.current?.nextCallback();

  const prevStep = () => stepperRef.current?.prevCallback();

  return (
    <article>
      <Stepper
        ref={stepperRef}
        orientation="vertical"
        className="max-w-5xl mx-auto"
      >
        <StepperPanel header="Datos del cliente">
          <section></section>
          <section className="flex justify-end px-2">
            <Button
              icon="pi pi-arrow-right"
              onClick={nextStep}
              className="h-10"
            />
          </section>
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

            <Button
              label='Generar'
              className="h-10"
            />
          </section>
        </StepperPanel>
      </Stepper>
    </article>
  );
}
