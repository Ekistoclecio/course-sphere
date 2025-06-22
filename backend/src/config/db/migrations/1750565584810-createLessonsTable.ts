import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLessonsTable1750565584810 implements MigrationInterface {
    name = 'CreateLessonsTable1750565584810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."lesson_status_enum" AS ENUM('draft', 'published', 'archived')`);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "status" "public"."lesson_status_enum" NOT NULL DEFAULT 'draft', "publish_date" TIMESTAMP NOT NULL, "video_url" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "course_id" integer NOT NULL, "creator_id" integer NOT NULL, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_5b2678a83db14ed1bfe89de5774" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_bf23bb822d7d056db941c1f3329" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_bf23bb822d7d056db941c1f3329"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_5b2678a83db14ed1bfe89de5774"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TYPE "public"."lesson_status_enum"`);
    }

}
