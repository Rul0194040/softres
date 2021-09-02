import {MigrationInterface, QueryRunner} from "typeorm";

export class fixito1630614375230 implements MigrationInterface {
    name = 'fixito1630614375230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`recetaId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`recetaId\` mediumint NULL`);
    }

}
