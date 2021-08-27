import {MigrationInterface, QueryRunner} from "typeorm";

export class siHayfecha1630015535770 implements MigrationInterface {
    name = 'siHayfecha1630015535770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` ADD \`fecha\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP COLUMN \`fecha\``);
    }

}
