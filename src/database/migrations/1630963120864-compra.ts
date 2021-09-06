import { MigrationInterface, QueryRunner } from 'typeorm';

export class compra1630963120864 implements MigrationInterface {
  name = 'compra1630963120864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`comprasDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`cantidad\` decimal(10,2) NOT NULL DEFAULT '0.00', \`descuento\` decimal(10,2) NOT NULL DEFAULT '0.00', \`total\` decimal(10,2) NOT NULL DEFAULT '0.00', \`insumoId\` int NULL, \`compraId\` int NOT NULL, UNIQUE INDEX \`IDX_8beeb3e413ead9af9d55d5d0fa\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`fecha\` datetime NULL DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`folio\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`descuento\` decimal NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`status\` enum ('Borrador', 'Enviado', 'Aceptado', 'Rechazado', 'Finalizado') NOT NULL DEFAULT 'Borrador'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`total\` decimal NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`pagado\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`proveedorId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_4eca7cf8b89d19a4c2762921ee9\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_414bcbe311a2714adc91e2ff111\` FOREIGN KEY (\`compraId\`) REFERENCES \`softres\`.\`compras\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD CONSTRAINT \`FK_ccbc87d4d0703f780e5f55f1f04\` FOREIGN KEY (\`proveedorId\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP FOREIGN KEY \`FK_ccbc87d4d0703f780e5f55f1f04\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_414bcbe311a2714adc91e2ff111\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_4eca7cf8b89d19a4c2762921ee9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`proveedorId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`pagado\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`total\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`descuento\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`folio\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`fecha\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8beeb3e413ead9af9d55d5d0fa\` ON \`softres\`.\`comprasDetalle\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`comprasDetalle\``);
  }
}
