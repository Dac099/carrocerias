import {
  pgTable,
  integer,
  varchar,
  char,
  check,
  timestamp,
  text,
  pgEnum,
  numeric,
  smallint,
  index,
} from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";

export const quoteStatusEnum = pgEnum("quote_status", [
  "draft",
  "sent",
  "approved",
  "rejected",
]);
export const userRoleEnum = pgEnum("user_role", ["manager", "client", "guest"]);

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
  (table) => ({
    idIdx: index("client_id_idx").on(table.id),
    emailIdx: index("client_email_idx").on(table.email),
    minimum_contact_data: check(
      "minimum_contact_data",
      sql`${table.phone} IS NOT NULL OR ${table.email} IS NOT NULL`
    ),
  })
);

export const userTable = pgTable(
  "user",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 100 }).unique().notNull(),
    password: varchar({ length: 100 }).notNull(),
    role: userRoleEnum().default("client"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
  },
  (table) => ({
    idIdx: index("user_id_idx").on(table.id),
    emailIdx: index("user_email_idx").on(table.email),
  })
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
  (table) => ({
    idIdx: index("supplier_id_idx").on(table.id),
    minimum_contact_data: check(
      "minimum_contact_data",
      sql`${table.phone} IS NOT NULL OR ${table.email} IS NOT NULL`
    ),
  })
);

export const serviceTable = pgTable(
  "service",
  {
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
  },
  (table) => ({
    idIdx: index("service_id_idx").on(table.id),
  })
);

export const bodytruckTable = pgTable(
  "bodytruck",
  {
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
  },
  (table) => ({
    idIdx: index("bodytruck_id_idx").on(table.id),
  })
);

export const quoteTable = pgTable(
  "quote",
  {
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
    clientNotes: text("client_notes"),
    internalNotes: text("internal_notes"),
  },
  (table) => ({
    idIdx: index("quote_id_idx").on(table.id),
    statusIdx: index("quote_status_idx").on(table.status),
  })
);

export const quoteBodytruck = pgTable(
  "quote_bodytruck",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    quoteId: integer("quote_id").notNull(),
    bodytruckId: integer("bodytruck_id").notNull(),
    quantity: integer().notNull().default(1),
    width: integer().notNull(),
    height: integer().notNull(),
    length: integer().notNull(),
    price: numeric({ precision: 10, scale: 4 }).notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
    estimatedDeliveryDays: smallint("estimated_delivery_days").notNull(),
  },
  (table) => ({
    idIdx: index("quote_bodytruck_id_idx").on(table.id),
  })
);

export const quoteService = pgTable(
  "quote_service",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    quoteId: integer("quote_id").notNull(),
    serviceId: integer("service_id").notNull(),
    estimatedDeliveryDays: smallint("estimated_delivery_days").notNull(),
    price: numeric({ precision: 8, scale: 4 }).notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
  },
  (table) => ({
    idIdx: index("quote_service_id_idx").on(table.id),
  })
);

export const quoteRelations = relations(quoteTable, ({ one, many }) => ({
  client: one(clientTable, {
    fields: [quoteTable.clientId],
    references: [clientTable.id],
  }),
  bodytrucks: many(quoteBodytruck),
  services: many(quoteService),
}));

export const clientRelations = relations(clientTable, ({ many }) => ({
  quotes: many(quoteTable),
}));

export const quoteBodyTruckRelations = relations(quoteBodytruck, ({ one }) => ({
  quote: one(quoteTable, {
    fields: [quoteBodytruck.quoteId],
    references: [quoteTable.id],
  }),
  bodytruck: one(bodytruckTable, {
    fields: [quoteBodytruck.bodytruckId],
    references: [bodytruckTable.id],
  }),
}));

export const quoteServiceRelations = relations(quoteService, ({ one }) => ({
  quote: one(quoteTable, {
    fields: [quoteService.quoteId],
    references: [quoteTable.id],
  }),
  service: one(serviceTable, {
    fields: [quoteService.serviceId],
    references: [serviceTable.id],
  }),
}));

export const bodytruckRelations = relations(bodytruckTable, ({ many }) => ({
  quoteBodytrucks: many(quoteBodytruck),
}));

export const serviceRelations = relations(serviceTable, ({ many }) => ({
  quoteServices: many(quoteService),
}));