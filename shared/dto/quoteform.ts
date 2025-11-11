export type QuoteFormDto = {
  client: ClientDto,
  items: ItemsDto,
  notes: {internal: string; forClient: string;},
};

export type ClientDto = {
  id?: number;
  name: string;
  company: string;
  phone: string;
  email: string;
};

export type ItemsDto = {
  bodytrucks: BodytruckDto[];
  services: ServiceDto[];
};

export type BodytruckDto = {
  id?: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  widtth: number;
  height: number;
  length: number;
};

export type ServiceDto = {
  id?: number;
  name: string;
  description: string;
  estimatedTimeDays: number;
  price: number;
};