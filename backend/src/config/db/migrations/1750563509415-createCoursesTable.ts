import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCoursesTable1750563509415 implements MigrationInterface {
    name = 'CreateCoursesTable1750563509415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(500), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_instructors" ("course_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_f241346add27e0558964b84e966" PRIMARY KEY ("course_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ff1fe7ba07418a03281c94fac4" ON "course_instructors" ("course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c204a45ca0de73f6b7d2d0f944" ON "course_instructors" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_8f892407dfbeffb09b98612062b" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD CONSTRAINT "FK_ff1fe7ba07418a03281c94fac46" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD CONSTRAINT "FK_c204a45ca0de73f6b7d2d0f9442" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP CONSTRAINT "FK_c204a45ca0de73f6b7d2d0f9442"`);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP CONSTRAINT "FK_ff1fe7ba07418a03281c94fac46"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_8f892407dfbeffb09b98612062b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c204a45ca0de73f6b7d2d0f944"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff1fe7ba07418a03281c94fac4"`);
        await queryRunner.query(`DROP TABLE "course_instructors"`);
        await queryRunner.query(`DROP TABLE "course"`);
    }

}
