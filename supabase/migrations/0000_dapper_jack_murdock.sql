CREATE TYPE "public"."quote_status" AS ENUM('draft', 'sent', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('manager', 'client', 'guest');--> statement-breakpoint
CREATE TABLE "bodytruck" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bodytruck_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(80) NOT NULL,
	"description" varchar(255) NOT NULL,
	"media_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "client" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "client_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"email" varchar(100),
	"phone" char(10),
	"company" varchar(100) DEFAULT 'Independent',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "client_email_unique" UNIQUE("email"),
	CONSTRAINT "client_phone_unique" UNIQUE("phone"),
	CONSTRAINT "minimum_contact_data" CHECK ("client"."phone" IS NOT NULL OR "client"."email" IS NOT NULL)
);
--> statement-breakpoint
CREATE TABLE "quote_bodytruck" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "quote_bodytruck_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"quote_id" integer NOT NULL,
	"bodytruck_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"length" integer NOT NULL,
	"price" numeric(10, 4) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"estimated_delivery_days" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quote_service" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "quote_service_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"quote_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"estimated_delivery_days" smallint NOT NULL,
	"price" numeric(8, 4) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "quote" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "quote_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"client_id" integer,
	"version" char(1) DEFAULT 'A',
	"status" "quote_status" DEFAULT 'draft',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"client_notes" text,
	"internal_notes" text
);
--> statement-breakpoint
CREATE TABLE "service" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "service_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(80) NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "supplier" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "supplier_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"email" varchar(100),
	"phone" char(10),
	"address" varchar(200) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "supplier_email_unique" UNIQUE("email"),
	CONSTRAINT "supplier_phone_unique" UNIQUE("phone"),
	CONSTRAINT "minimum_contact_data" CHECK ("supplier"."phone" IS NOT NULL OR "supplier"."email" IS NOT NULL)
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"role" "user_role" DEFAULT 'client',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "bodytruck_id_idx" ON "bodytruck" USING btree ("id");--> statement-breakpoint
CREATE INDEX "client_id_idx" ON "client" USING btree ("id");--> statement-breakpoint
CREATE INDEX "client_email_idx" ON "client" USING btree ("email");--> statement-breakpoint
CREATE INDEX "quote_bodytruck_id_idx" ON "quote_bodytruck" USING btree ("id");--> statement-breakpoint
CREATE INDEX "quote_service_id_idx" ON "quote_service" USING btree ("id");--> statement-breakpoint
CREATE INDEX "quote_id_idx" ON "quote" USING btree ("id");--> statement-breakpoint
CREATE INDEX "quote_status_idx" ON "quote" USING btree ("status");--> statement-breakpoint
CREATE INDEX "service_id_idx" ON "service" USING btree ("id");--> statement-breakpoint
CREATE INDEX "supplier_id_idx" ON "supplier" USING btree ("id");--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "user" USING btree ("id");--> statement-breakpoint
CREATE INDEX "user_email_idx" ON "user" USING btree ("email");