import { MigrationInterface, QueryRunner } from 'typeorm';

export class newFeatures1630444183610 implements MigrationInterface {
  name = 'newFeatures1630444183610';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`recetas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`costoTotal\` mediumint NULL, \`merma\` mediumint NULL DEFAULT '10', \`costoUnitarioReceta\` mediumint NULL, \`factorAlimentos\` mediumint NULL DEFAULT '3', \`costoIva\` mediumint NULL, \`costoSinIva\` mediumint NULL, \`precioSugeridoCarta\` mediumint NULL, UNIQUE INDEX \`IDX_9c6bbb025a661bb198e0d91e0b\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`recetasDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`rendimiento\` mediumint NOT NULL, \`numPorciones\` mediumint NOT NULL, \`numXporcion\` mediumint NOT NULL, \`nombre\` varchar(100) NOT NULL, \`cantReceta\` mediumint NOT NULL, \`cantReal\` mediumint NOT NULL, \`precioMercado\` mediumint NOT NULL, \`insumoId\` int NOT NULL, UNIQUE INDEX \`IDX_fe86a44f968e34233fd51dce81\` (\`uuid\`), UNIQUE INDEX \`REL_f4a52e7383478fff0821b47277\` (\`insumoId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`pesoNeto\` mediumint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`pesoDrenado\` mediumint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`precioKilo\` mediumint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`merma\` mediumint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`mermaPorcentaje\` mediumint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('ml', 'gr') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetasDetalle\` ADD CONSTRAINT \`FK_f4a52e7383478fff0821b47277c\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`costoVenta\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetasDetalle\` DROP FOREIGN KEY \`FK_f4a52e7383478fff0821b47277c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('Lt', 'pza', 'kg', 'ml', 'gr') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`mermaPorcentaje\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`merma\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`precioKilo\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`pesoDrenado\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`pesoNeto\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD \`capacidad\` decimal(10,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f4a52e7383478fff0821b47277\` ON \`softres\`.\`recetasDetalle\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fe86a44f968e34233fd51dce81\` ON \`softres\`.\`recetasDetalle\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`recetasDetalle\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_9c6bbb025a661bb198e0d91e0b\` ON \`softres\`.\`recetas\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`recetas\``);
  }
}
