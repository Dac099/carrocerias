import { Button } from "primereact/button";
import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../actions";
import { useState } from "react";
import { BodytruckDto, ServiceDto } from "@/shared/dto/quoteform";
import { Dialog } from "primereact/dialog";
import BodytruckForm from './bodytruckForm';
import ServiceForm from './serviceForm';

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  setFormData: (bodytrucks: BodytruckDto[], services: ServiceDto[]) => void;
};

export default function ProductsForm({
  prevStep,
  nextStep,
  setFormData,
}: Props) {
  const [bodytrucks, setBodytrucks] = useState<BodytruckDto[]>([]); // Bodytrucks to insert in the quote
  const [services, setServices] = useState<ServiceDto[]>([]); // Services to insert in the quote
  const [dialogTarget, setDialogTarget] = useState<
    "bodytruck" | "service" | null
  >(null);

  const result = useQuery({
    queryKey: ["productsAnsServices"],
    queryFn: fetchItems,
  });

  const handleAddBodyTruck = (bodytruck: BodytruckDto) => {
    setBodytrucks([...bodytrucks, bodytruck]);
    setDialogTarget(null);
  };

  const handleAddService = (service: ServiceDto) => {
    setServices([...services, service]);
    setDialogTarget(null);
  };

  return (
    <>
      <section className="p-2">
        <div className="w-full flex items-center gap-2 mb-3">
          <Button
            icon="pi pi-truck"
            label="Agregar carrocería"
            outlined
            onClick={() => setDialogTarget("bodytruck")}
          />
          <Button
            icon="pi pi-wrench"
            label="Agregar servicio"
            outlined
            onClick={() => setDialogTarget("service")}
          />
        </div>
      </section>

      <section className="flex justify-end p-2 gap-3">
        <Button icon="pi pi-arrow-left" onClick={prevStep} className="h-10" />

        <Button icon="pi pi-arrow-right" onClick={nextStep} className="h-10" />
      </section>

      <Dialog
        visible={dialogTarget !== null}
        onHide={() => setDialogTarget(null)}
        header={
          dialogTarget === "bodytruck"
            ? "Agregar carrocería"
            : "Agregar servicio"
        }
        position='top'
        resizable={false}
        draggable={false}
        className='w-11/12'
      >
        {dialogTarget === 'bodytruck' &&
          <BodytruckForm
            bodytrucks={result.data?.bodytrucks || []}
            handleAddBodyTruck={handleAddBodyTruck}
          />
        }
        {dialogTarget === 'service' && <ServiceForm />}
      </Dialog>
    </>
  );
}
