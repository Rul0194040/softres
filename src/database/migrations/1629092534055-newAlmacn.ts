import { MigrationInterface, QueryRunner } from 'typeorm';

export class newAlmacn1629092534055 implements MigrationInterface {
  name = 'newAlmacn1629092534055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`unidad\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP COLUMN \`ventaId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP COLUMN \`compraId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`medida\` enum ('Lt', 'kg') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`precioUnitario\` mediumint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD \`precioVenta\` mediumint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD \`factor\` decimal NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD \`total\` mediumint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` ADD \`depto\` enum ('COCINA', 'BARRA') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`unidad\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`unidad\` enum ('bidon', 'garrafa', 'bolsa', 'frasco', 'botella', 'caja', 'lata', 'cubeta', 'paquete') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`insumoId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD \`insumoId\` mediumint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` CHANGE \`precioUnitario\` \`precioUnitario\` decimal(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` CHANGE \`saldo\` \`saldo\` decimal(10,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` CHANGE \`saldo\` \`saldo\` decimal(10,2) NOT NULL DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` CHANGE \`precioUnitario\` \`precioUnitario\` decimal(10,2) NOT NULL DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`insumoId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD \`insumoId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`unidad\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`unidad\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP COLUMN \`depto\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`total\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`factor\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`precioVenta\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`precioUnitario\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`medida\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` ADD \`compraId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` ADD \`ventaId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD \`unidad\` varchar(25) NOT NULL`,
    );
  }
}
