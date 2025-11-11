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
