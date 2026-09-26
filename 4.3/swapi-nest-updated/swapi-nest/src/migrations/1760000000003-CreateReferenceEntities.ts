import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReferenceEntities1760000000003 implements MigrationInterface {
  name = 'CreateReferenceEntities1760000000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "genders" ("id" SERIAL NOT NULL, "created" TIMESTAMPTZ NOT NULL DEFAULT now(), "edited" TIMESTAMPTZ NOT NULL DEFAULT now(), "name" character varying(64) NOT NULL, CONSTRAINT "PK_genders" PRIMARY KEY ("id"), CONSTRAINT "UQ_genders_name" UNIQUE ("name"))`);
    await queryRunner.query(`CREATE TABLE "planets" ("id" SERIAL NOT NULL, "created" TIMESTAMPTZ NOT NULL DEFAULT now(), "edited" TIMESTAMPTZ NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "rotation_period" character varying(64) NOT NULL, "orbital_period" character varying(64) NOT NULL, "diameter" character varying(64) NOT NULL, "climate" character varying(255) NOT NULL, "gravity" character varying(255) NOT NULL, "terrain" character varying(255) NOT NULL, "surface_water" character varying(64) NOT NULL, "population" character varying(64) NOT NULL, CONSTRAINT "PK_planets" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "films" ("id" SERIAL NOT NULL, "created" TIMESTAMPTZ NOT NULL DEFAULT now(), "edited" TIMESTAMPTZ NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "episode_id" integer NOT NULL, "opening_crawl" text NOT NULL, "director" character varying(255) NOT NULL, "producer" character varying(255) NOT NULL, "release_date" date NOT NULL, CONSTRAINT "PK_films" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "species" ("id" SERIAL NOT NULL, "created" TIMESTAMPTZ NOT NULL DEFAULT now(), "edited" TIMESTAMPTZ NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "classification" character varying(255) NOT NULL, "designation" character varying(255) NOT NULL, "average_height" character varying(64) NOT NULL, "skin_colors" character varying(255) NOT NULL, "hair_colors" character varying(255) NOT NULL, "eye_colors" character varying(255) NOT NULL, "average_lifespan" character varying(64) NOT NULL, "language" character varying(255) NOT NULL, "homeworld_id" integer, CONSTRAINT "PK_species" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "created" TIMESTAMPTZ NOT NULL DEFAULT now(), "edited" TIMESTAMPTZ NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "manufacturer" character varying(255) NOT NULL, "cost_in_credits" character varying(64) NOT NULL, "length" character varying(64) NOT NULL, "max_atmosphering_speed" character varying(64) NOT NULL, "crew" character varying(64) NOT NULL, "passengers" character varying(64) NOT NULL, "cargo_capacity" character varying(64) NOT NULL, "consumables" character varying(255) NOT NULL, "vehicle_class" character varying(255) NOT NULL, CONSTRAINT "PK_vehicles" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "starships" ("id" SERIAL NOT NULL, "created" TIMESTAMPTZ NOT NULL DEFAULT now(), "edited" TIMESTAMPTZ NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "manufacturer" character varying(255) NOT NULL, "cost_in_credits" character varying(64) NOT NULL, "length" character varying(64) NOT NULL, "max_atmosphering_speed" character varying(64) NOT NULL, "crew" character varying(64) NOT NULL, "passengers" character varying(64) NOT NULL, "cargo_capacity" character varying(64) NOT NULL, "consumables" character varying(255) NOT NULL, "hyperdrive_rating" character varying(64) NOT NULL, "MGLT" character varying(64) NOT NULL, "starship_class" character varying(255) NOT NULL, CONSTRAINT "PK_starships" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_species_homeworld" FOREIGN KEY ("homeworld_id") REFERENCES "planets"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "people" ADD "homeworld_id" integer, ADD "gender_id" integer`);
    await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_people_homeworld" FOREIGN KEY ("homeworld_id") REFERENCES "planets"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_people_gender" FOREIGN KEY ("gender_id") REFERENCES "genders"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`CREATE TABLE "people_films" ("person_id" integer NOT NULL, "film_id" integer NOT NULL, CONSTRAINT "PK_people_films" PRIMARY KEY ("person_id", "film_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_people_films_person" ON "people_films" ("person_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_people_films_film_id" ON "people_films" ("film_id")`);
    await queryRunner.query(`ALTER TABLE "people_films" ADD CONSTRAINT "FK_people_films_person" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "people_films" ADD CONSTRAINT "FK_people_films_film_id" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`CREATE TABLE "people_species" ("person_id" integer NOT NULL, "species_id" integer NOT NULL, CONSTRAINT "PK_people_species" PRIMARY KEY ("person_id", "species_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_people_species_person" ON "people_species" ("person_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_people_species_species_id" ON "people_species" ("species_id")`);
    await queryRunner.query(`ALTER TABLE "people_species" ADD CONSTRAINT "FK_people_species_person" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "people_species" ADD CONSTRAINT "FK_people_species_species_id" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`CREATE TABLE "people_vehicles" ("person_id" integer NOT NULL, "vehicle_id" integer NOT NULL, CONSTRAINT "PK_people_vehicles" PRIMARY KEY ("person_id", "vehicle_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_people_vehicles_person" ON "people_vehicles" ("person_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_people_vehicles_vehicle_id" ON "people_vehicles" ("vehicle_id")`);
    await queryRunner.query(`ALTER TABLE "people_vehicles" ADD CONSTRAINT "FK_people_vehicles_person" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "people_vehicles" ADD CONSTRAINT "FK_people_vehicles_vehicle_id" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`CREATE TABLE "people_starships" ("person_id" integer NOT NULL, "starship_id" integer NOT NULL, CONSTRAINT "PK_people_starships" PRIMARY KEY ("person_id", "starship_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_people_starships_person" ON "people_starships" ("person_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_people_starships_starship_id" ON "people_starships" ("starship_id")`);
    await queryRunner.query(`ALTER TABLE "people_starships" ADD CONSTRAINT "FK_people_starships_person" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "people_starships" ADD CONSTRAINT "FK_people_starships_starship_id" FOREIGN KEY ("starship_id") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`INSERT INTO "genders" ("name") VALUES ('male'), ('female'), ('n/a'), ('hermaphrodite'), ('none')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "people_starships"`);
    await queryRunner.query(`DROP TABLE "people_vehicles"`);
    await queryRunner.query(`DROP TABLE "people_species"`);
    await queryRunner.query(`DROP TABLE "people_films"`);
    await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "gender_id", DROP COLUMN "homeworld_id"`);
    await queryRunner.query(`DROP TABLE "starships"`);
    await queryRunner.query(`DROP TABLE "vehicles"`);
    await queryRunner.query(`DROP TABLE "species"`);
    await queryRunner.query(`DROP TABLE "films"`);
    await queryRunner.query(`DROP TABLE "planets"`);
    await queryRunner.query(`DROP TABLE "genders"`);
  }
}
