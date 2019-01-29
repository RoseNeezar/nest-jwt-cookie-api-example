import {MigrationInterface, QueryRunner} from "typeorm";

export class init1548769269722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("sourceId" uuid NOT NULL, "targetId" uuid NOT NULL, CONSTRAINT "PK_aa84f9aab8893b7070bafaeb75f" PRIMARY KEY ("sourceId", "targetId"))`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3c6840f422ce47e60a57281dc83" FOREIGN KEY ("sourceId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e3c4ba6856cb0757df3b98f4fe0" FOREIGN KEY ("targetId") REFERENCES "users"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e3c4ba6856cb0757df3b98f4fe0"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3c6840f422ce47e60a57281dc83"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
