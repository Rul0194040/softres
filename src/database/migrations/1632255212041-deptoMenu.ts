import {MigrationInterface, QueryRunner} from "typeorm";

export class deptoMenu1632255212041 implements MigrationInterface {
    name = 'deptoMenu1632255212041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`menus\` ADD \`depto\` enum ('COCINA', 'BARRA', 'ALMACÉN') NOT NULL DEFAULT 'COCINA'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`menus\` DROP COLUMN \`depto\``);
    }

}
