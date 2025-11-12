"use server";
import { db } from "@/database";
import * as schemas from "@/database/schemas/schema";
import { FetchError } from "@/shared/classes/fetchError";

export async function getClients() {
  try {
    return await db
      .select({
        id: schemas.clientTable.id,
        name: schemas.clientTable.name,
        company: schemas.clientTable.company,
        phone: schemas.clientTable.phone,
        email: schemas.clientTable.email,
      })
      .from(schemas.clientTable);
  } catch (error) {
    throw new FetchError(
      500,
      "Error fetching clients",
      "No se pudieron obtener los clientes",
      error as Error
    );
  }
}

export async function fetchItems() {
  try {
    const { bodytruckTable, serviceTable } = schemas;
    const bodytrucks = await db
      .select({
        id: bodytruckTable.id,
        name: bodytruckTable.name,
        description: bodytruckTable.description,
      })
      .from(bodytruckTable);
    const services = await db
      .select({
        id: serviceTable.id,
        name: serviceTable.name,
        description: serviceTable.description,
      })
      .from(serviceTable);

      return [ bodytrucks, services ];
  } catch (error) {
    throw new FetchError(
      500,
      "Error fetching items",
      "No se pudieron obtener los items",
      error as Error
    );
  }
}
