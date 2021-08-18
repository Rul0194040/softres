import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAlmcn1629317663060 implements MigrationInterface {
    name = 'fixAlmcn1629317663060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP COLUMN \`existencias\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`capacidad\` decimal NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`cantidad\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('Lt', 'pza', 'kg') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`unidad\` \`unidad\` enum ('botella', 'bolsa', 'costal', 'cubeta', 'paquete', 'lata', 'caja', 'frasco', 'bidon', 'garrafa') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`unidad\` \`unidad\` enum ('bidon', 'garrafa', 'bolsa', 'frasco', 'botella', 'caja', 'lata', 'cubeta', 'paquete') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('Lt', 'kg') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`cantidad\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`capacidad\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` ADD \`existencias\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    }

}
