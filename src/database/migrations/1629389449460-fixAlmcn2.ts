import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAlmcn21629389449460 implements MigrationInterface {
    name = 'fixAlmcn21629389449460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP COLUMN \`depto\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`depto\` enum ('COCINA', 'BARRA') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`depto\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` ADD \`depto\` enum ('COCINA', 'BARRA') NOT NULL`);
    }

}
