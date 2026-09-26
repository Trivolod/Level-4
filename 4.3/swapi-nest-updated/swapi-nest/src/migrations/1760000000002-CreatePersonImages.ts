import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePersonImages1760000000002 implements MigrationInterface {
  name = 'CreatePersonImages1760000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "person_images" (
        "id" SERIAL NOT NULL,
        "created" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "token" uuid NOT NULL,
        "original_name" character varying(255) NOT NULL,
        "mime_type" character varying(64) NOT NULL,
        "size" integer NOT NULL,
        "stored_name" character varying(255) NOT NULL,
        "person_id" integer NOT NULL,
        CONSTRAINT "UQ_person_images_token" UNIQUE ("token"),
        CONSTRAINT "PK_person_images" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`CREATE INDEX "IDX_person_images_person" ON "person_images" ("person_id")`);
    await queryRunner.query(`
      ALTER TABLE "person_images"
      ADD CONSTRAINT "FK_person_images_person" FOREIGN KEY ("person_id")
      REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "person_images"`);
  }
}
