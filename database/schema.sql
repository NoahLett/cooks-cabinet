set client_min_messages to warning;

drop SCHEMA "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
  "userId" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "hashedPassword" TEXT NOT NULL,
  "createdAt" timestamptz(6) DEFAULT now()
);

CREATE TABLE "public"."recipes" (
  "recipeId" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "photoUrl" TEXT NOT NULL,
  "steps" TEXT[] NOT NULL,
  "ingredients" TEXT[] NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "deleted" BOOLEAN DEFAULT FALSE,
  "userId" INTEGER NOT NULL,
  CONSTRAINT "recipes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId")
);
