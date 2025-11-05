import {
  pgTable,
  integer,
  varchar,
  char,
  check,
  timestamp,
  text,
  pgEnum
} from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";

export const quoteStatusEnum = pgEnum("quote_status", ["draft", "sent", "approved", "rejected"]);

export const clientTable = pgTable(
  "client",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 100 }).unique(),
    phone: char({ length: 10 }).unique(),
    company: varchar({ length: 100 }).default("Independent"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
  },
  (table) => [
    check(
      "minimum_contact_data",
      sql`${table.phone} IS NOT NULL OR ${table.email} IS NOT NULL`
    ),
  ]
);

export const supplierTable = pgTable(
  "supplier",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 100 }).unique(),
    phone: char({ length: 10 }).unique(),
    address: varchar({ length: 200 }).notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
  },
  (table) => [
    check(
      "minimum_contact_data",
      sql`${table.phone} IS NOT NULL OR ${table.email} IS NOT NULL`
    ),
  ]
);

export const serviceTable = pgTable("service", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 80 }).notNull(),
  description: text().notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});

export const bodytruckTable = pgTable("bodytruck", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 80 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  mediaUrl: varchar("media_url", { length: 255 }),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});

export const quoteTable = pgTable("quote", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clientId: integer("client_id"),
  version: char({ length: 1 }).default("A"),
  status: quoteStatusEnum().default("draft"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
