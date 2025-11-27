'use client';
import { useState } from 'react';
import { BodytruckDto } from '@/shared/dto/quoteform';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload, FileUploadFile } from 'primereact/fileupload';

type BodyTruckResponse = {
  id: number,
  name: string;
  description: string;
  mediaUrl: string | null
}

type Props = {
  bodytrucks: BodyTruckResponse[];
  handleAddBodyTruck: (bodytruck: BodytruckDto) => void;
};

export default function BodytruckForm({ bodytrucks, handleAddBodyTruck }: Props) {
  const [wasSelectedFromTable, setWasSelectedFromTable] = useState(false);
  const [bodyTruckToAdd, setBodyTruckToAdd] = useState<BodytruckDto>({
    id: -1,
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    width: 0,
    height: 0,
    length: 0,
    mediaUrl: null,
  });

  const handleSelectionBodyTruck = (bodytruck: BodyTruckResponse) => {
    setWasSelectedFromTable(true);
    setBodyTruckToAdd(prev => ({ ...prev, ...bodytruck }));
  }

  const setBodyTruckValue = (key: string, value: string | number) => {
    setBodyTruckToAdd(prev => ({ ...prev, [key]: value }));
  }

  const handleSelectionImages = (files: FileUploadFile[]) => {

  }

  return (
    <article>
      <section className='max-h-96 overflow-y-auto'>
        <DataTable
          value={bodytrucks}
          selectionMode='single'
          selection={bodyTruckToAdd}
          onSelectionChange={e => handleSelectionBodyTruck(e.value)}
        >
          <Column field='id' header='Id' />
          <Column field='name' header='Nombre' />
          <Column field='description' header='Descripción' />
          <Column field='mediaUrl' header='Contenido' />
        </DataTable>
      </section>

      <section className='mt-8'>
        <FloatLabel>
          <label>Nombre</label>
          <InputText
            value={bodyTruckToAdd.name}
            onChange={(e) => setBodyTruckValue('name', e.target.value)}
            readOnly={wasSelectedFromTable}
          />
        </FloatLabel>

        <FloatLabel>
          <label>Descripción</label>
          <InputTextarea
            value={bodyTruckToAdd.description}
            onChange={(e) => setBodyTruckValue('description', e.target.value)}
            readOnly={wasSelectedFromTable}
          />
        </FloatLabel>

        <FloatLabel>
          <label>Cantidad</label>
          <InputNumber
            value={bodyTruckToAdd.quantity}
            onChange={(e) => setBodyTruckValue('quantity', e.value || 1)}
            min={1}
          />
        </FloatLabel>

        <FloatLabel>
          <label>Precio</label>
          <InputNumber
            value={bodyTruckToAdd.price}
            onChange={(e) => setBodyTruckValue('price', e.value || 0)}
            prefix='$'
            suffix=' MXN'
            min={0}
          />
        </FloatLabel>

        <FloatLabel>
          <label>Alto</label>
          <InputNumber
            value={bodyTruckToAdd.height}
            onChange={(e) => setBodyTruckValue('height', e.value || 0)}
            min={0}
            suffix=' cm'
          />
        </FloatLabel>

        <FloatLabel>
          <label>Ancho</label>
          <InputNumber
            value={bodyTruckToAdd.width}
            onChange={(e) => setBodyTruckValue('width', e.value || 0)}
            min={0}
            suffix=' cm'
          />
        </FloatLabel>

        <FloatLabel>
          <label>Largo</label>
          <InputNumber
            value={bodyTruckToAdd.length}
            onChange={(e) => setBodyTruckValue('length', e.value || 0)}
            min={0}
            suffix=' cm'
          />
        </FloatLabel>

        <FileUpload
          mode='basic'
          name='bodytruckImg[]'
          accept='image/*'
          chooseLabel='Agregar contenido'
          multiple
          onSelect={e => handleSelectionImages(e.files)}
        />
      </section>
    </article>
  );
}
