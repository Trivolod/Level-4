import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1760000000004 implements MigrationInterface {
  name = 'CreateUsers1760000000004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM ('user', 'admin')`);
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "created" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "edited" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "email" character varying(255) NOT NULL,
        "password" character varying(255) NOT NULL,
        "role" "users_role_enum" NOT NULL DEFAULT 'user',
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "users_role_enum"`);
  }
}
