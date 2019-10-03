
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" character varying(80) NOT NULL UNIQUE,
    "password" character varying(1000) NOT NULL,
    "email" character varying(500) NOT NULL DEFAULT 'test',
    "name" character varying(500) NOT NULL DEFAULT 'test',
    "location" character varying(500) NOT NULL DEFAULT 'test',
    "isAdmin" boolean DEFAULT false
);

CREATE TABLE "groups"
(
    "id" SERIAL PRIMARY KEY,
    "group_name" VARCHAR(200),
    "group_id_number" VARCHAR(200),
    "group_admin" integer REFERENCES "user"(id)
);


ALTER TABLE "user"
ADD COLUMN "active_group_id" INTEGER REFERENCES "groups"
(id);

CREATE TABLE "comments"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" integer REFERENCES "user"(id),
    "comment" VARCHAR(1000),
    "date" date DEFAULT now(),
    "recommended" boolean DEFAULT true
);

CREATE TABLE "restaurants"
(
    "id" SERIAL PRIMARY KEY,
    "name" character varying(150) NOT NULL,
    "type" character varying(50) NOT NULL,
    "user_id" integer REFERENCES "user"(id),
    "address" character varying(200) NOT NULL,
    "city" character varying(100) NOT NULL,
    "state" character varying(20) NOT NULL,
    "zip" character varying(20) NOT NULL,
    "country" character varying(30) NOT NULL,
    "photo_url" character varying(500),
    "closed" boolean DEFAULT false,
    "what_group_id" integer REFERENCES "groups"(id)
);

CREATE TABLE "users_groups"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" integer REFERENCES "user"(id),
    "groups_id" integer REFERENCES "groups"(id)
);
ALTER TABLE "comments"
ADD COLUMN "restaurant_id" INTEGER REFERENCES "restaurants"
(id);