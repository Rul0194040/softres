import { MigrationInterface, QueryRunner } from 'typeorm';

export class agosto1630336032495 implements MigrationInterface {
  name = 'agosto1630336032495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`almacenDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`almacenId\` int NOT NULL, \`fecha\` date NULL, \`referencia\` varchar(25) NOT NULL, \`entradas\` decimal(10,2) NOT NULL DEFAULT '0.00', \`salidas\` decimal(10,2) NOT NULL DEFAULT '0.00', \`existencias\` decimal(10,2) NOT NULL DEFAULT '0.00', \`precioUnitario\` decimal(10,2) NOT NULL, \`precioMedio\` decimal(10,2) NOT NULL DEFAULT '0.00', \`cargo\` decimal(10,2) NOT NULL DEFAULT '0.00', \`abono\` decimal(10,2) NOT NULL DEFAULT '0.00', \`saldo\` decimal(10,2) NOT NULL, UNIQUE INDEX \`IDX_eeb7b920b0758a46ce99bf0a3a\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`categorias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_e3619e505b1c0ee392a6034466\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`insumos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`medida\` enum ('Lt', 'pza', 'kg', 'ml', 'gr') NULL, \`unidad\` enum ('botella', 'bolsa', 'costal', 'cubeta', 'paquete', 'lata', 'caja', 'frasco', 'bidon', 'garrafa') NOT NULL, \`marca\` varchar(100) NOT NULL, \`precioUnitario\` mediumint NOT NULL, \`categoriaId\` int NULL, FULLTEXT INDEX \`IDX_0d28ae68a8f742beb176aa51ae\` (\`nombre\`), UNIQUE INDEX \`IDX_47c2e83bcc01b5610a4a35e600\` (\`nombre\`, \`marca\`), UNIQUE INDEX \`IDX_8660e0a51b002f2afa8fed1e76\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`almacen\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`type\` enum ('PROMEDIOS', 'UEPS', 'PEPS') NOT NULL DEFAULT 'PROMEDIOS', \`depto\` enum ('COCINA', 'BARRA') NOT NULL DEFAULT 'COCINA', \`insumoId\` int NOT NULL, \`capacidad\` decimal NOT NULL DEFAULT '0', \`cantidad\` decimal(10,2) NOT NULL DEFAULT '0.00', \`costoVenta\` mediumint NULL, \`total\` mediumint NOT NULL, UNIQUE INDEX \`IDX_f5261de086b3c1e396804ff07a\` (\`uuid\`), UNIQUE INDEX \`REL_c85f240d18929e2bcf14dba4f2\` (\`insumoId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`compras\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_b9833b86d242aff7a6c1c33d73\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL, \`picUrl\` varchar(250) NULL, \`profile\` varchar(50) NOT NULL, \`rules\` text NULL, \`email\` varchar(100) NOT NULL, \`validEmail\` tinyint NOT NULL DEFAULT 0, \`emailToken\` varchar(6) NULL, \`password\` varchar(100) NOT NULL, \`jwt\` text NULL, \`passwordToken\` varchar(500) NULL, \`passwordTokenDate\` timestamp NULL, UNIQUE INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`ventas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_3ed9f17ae386011d90a743b9cd\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacenDetalle\` ADD CONSTRAINT \`FK_f707039c03ee56b2b0006763dcd\` FOREIGN KEY (\`almacenId\`) REFERENCES \`softres\`.\`almacen\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_1acafbf46b10a4650b5935ee728\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`softres\`.\`categorias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD CONSTRAINT \`FK_c85f240d18929e2bcf14dba4f2e\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP FOREIGN KEY \`FK_c85f240d18929e2bcf14dba4f2e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_1acafbf46b10a4650b5935ee728\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacenDetalle\` DROP FOREIGN KEY \`FK_f707039c03ee56b2b0006763dcd\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3ed9f17ae386011d90a743b9cd\` ON \`softres\`.\`ventas\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`ventas\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`softres\`.\`users\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b9833b86d242aff7a6c1c33d73\` ON \`softres\`.\`compras\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`compras\``);
    await queryRunner.query(
      `DROP INDEX \`REL_c85f240d18929e2bcf14dba4f2\` ON \`softres\`.\`almacen\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f5261de086b3c1e396804ff07a\` ON \`softres\`.\`almacen\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`almacen\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8660e0a51b002f2afa8fed1e76\` ON \`softres\`.\`insumos\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_47c2e83bcc01b5610a4a35e600\` ON \`softres\`.\`insumos\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0d28ae68a8f742beb176aa51ae\` ON \`softres\`.\`insumos\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`insumos\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e3619e505b1c0ee392a6034466\` ON \`softres\`.\`categorias\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`categorias\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_eeb7b920b0758a46ce99bf0a3a\` ON \`softres\`.\`almacenDetalle\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`almacenDetalle\``);
  }
}
