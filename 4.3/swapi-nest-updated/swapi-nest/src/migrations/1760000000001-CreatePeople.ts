import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeople1760000000001 implements MigrationInterface {
  name = 'CreatePeople1760000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "people" (
        "id" SERIAL NOT NULL,
        "created" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "edited" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "name" character varying(255) NOT NULL,
        "height" character varying(64) NOT NULL,
        "mass" character varying(64) NOT NULL,
        "hair_color" character varying(128) NOT NULL,
        "skin_color" character varying(128) NOT NULL,
        "eye_color" character varying(128) NOT NULL,
        "birth_year" character varying(32) NOT NULL,
        CONSTRAINT "PK_people" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "people"`);
  }
}
