import { MigrationInterface, QueryRunner } from "typeorm";

export class JournalEntry1712648880585 implements MigrationInterface {
    name = 'JournalEntry1712648880585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."journal_entry_type_enum" AS ENUM('LUNCH', 'DINNER', 'WORKOUT', 'DEFAULT')`);
        await queryRunner.query(`CREATE TYPE "public"."journal_entry_status_enum" AS ENUM('SUCCESS', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "journal_entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."journal_entry_type_enum" NOT NULL DEFAULT 'DEFAULT', "status" "public"."journal_entry_status_enum" NOT NULL DEFAULT 'FAILED', "notes" character varying NOT NULL, CONSTRAINT "PK_69167f660c807d2aa178f0bd7e6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "journal_entry"`);
        await queryRunner.query(`DROP TYPE "public"."journal_entry_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."journal_entry_type_enum"`);
    }

}
