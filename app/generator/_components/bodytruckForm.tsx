import { Dropdown } from "primereact/dropdown";

type Props = {
  bodytrucks: { id: number, name: string; description: string; }[];
};

export default function BodytruckForm({ bodytrucks }: Props) {
  const bodyTruckOptions = bodytrucks.map((bt) => ({
    label: bt.name,
    value: bt,
  }));

  return (
    <article>
      <Dropdown

      />
    </article>
  );
}