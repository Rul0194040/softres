import {MigrationInterface, QueryRunner} from "typeorm";

export class kg1633150716087 implements MigrationInterface {
    name = 'kg1633150716087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP FOREIGN KEY \`FK_c85f240d18929e2bcf14dba4f2e\``,);
        await queryRunner.query(`DROP INDEX \`REL_c85f240d18929e2bcf14dba4f2\` ON \`softres\`.\`almacen\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacenDetalle\` CHANGE \`entradas\` \`entradas\` decimal(6,3) NOT NULL DEFAULT '0.000'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacenDetalle\` CHANGE \`salidas\` \`salidas\` decimal(6,3) NOT NULL DEFAULT '0.000'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacenDetalle\` CHANGE \`existencias\` \`existencias\` decimal(6,3) NOT NULL DEFAULT '0.000'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`pesoNeto\` \`pesoNeto\` decimal(6,3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`pesoDrenado\` \`pesoDrenado\` decimal(6,3) NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`merma\` \`merma\` decimal(6,3) NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`maximo\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`maximo\` decimal(6,3) NULL DEFAULT '0.000'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`minimo\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`minimo\` decimal(6,3) NULL DEFAULT '0.000'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`cantidad\` \`cantidad\` decimal(6,3) NOT NULL DEFAULT '0.000'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`total\` decimal(6,3) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`total\` mediumint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`cantidad\` \`cantidad\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`minimo\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`minimo\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`maximo\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`maximo\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`merma\` \`merma\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`pesoDrenado\` \`pesoDrenado\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`pesoNeto\` \`pesoNeto\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacenDetalle\` CHANGE \`existencias\` \`existencias\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacenDetalle\` CHANGE \`salidas\` \`salidas\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacenDetalle\` CHANGE \`entradas\` \`entradas\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c85f240d18929e2bcf14dba4f2\` ON \`softres\`.\`almacen\` (\`insumoId\`)`);
    }

}
