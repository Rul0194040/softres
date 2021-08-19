import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAlmcn31629402008967 implements MigrationInterface {
    name = 'fixAlmcn31629402008967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`factor\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('Lt', 'pza', 'kg', 'ml', 'gr') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`depto\` \`depto\` enum ('COCINA', 'BARRA') NOT NULL DEFAULT 'COCINA'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`insumoId\` \`insumoId\` mediumint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`insumoId\` \`insumoId\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`depto\` \`depto\` enum ('COCINA', 'BARRA') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('Lt', 'pza', 'kg') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`factor\` decimal(10,0) NOT NULL DEFAULT '0'`);
    }

}
