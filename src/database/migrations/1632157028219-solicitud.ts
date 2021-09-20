import { MigrationInterface, QueryRunner } from 'typeorm';

export class solicitud1632157028219 implements MigrationInterface {
  name = 'solicitud1632157028219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`solicitudDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`solicitudId\` int NOT NULL, \`cantidad\` int NOT NULL, \`insumoId\` int NULL, UNIQUE INDEX \`IDX_047844d787ae4285998c456bfe\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`solicitud\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`usuarioId\` int NOT NULL, \`fecha\` date NOT NULL, \`folio\` text NOT NULL, \`depto\` enum ('COCINA', 'BARRA', 'ALMACÉN') NOT NULL DEFAULT 'COCINA', \`status\` enum ('generada', 'revision', 'completada') NULL DEFAULT 'generada', UNIQUE INDEX \`IDX_d817112cdf0f7e406f60b883c4\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`cotizacionDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`cotizacionId\` int NOT NULL, \`insumoId\` int NOT NULL, \`proveedor1Id\` int NULL, \`proveedor2Id\` int NULL, \`proveedor3Id\` int NULL, \`proveedorSeleccionadoId\` int NULL, \`precio1\` float NOT NULL DEFAULT '0', \`precio2\` float NOT NULL DEFAULT '0', \`precio3\` float NOT NULL DEFAULT '0', \`precioSeleccionado\` float NOT NULL DEFAULT '0', \`descuento1\` float NOT NULL DEFAULT '0', \`descuento2\` float NOT NULL DEFAULT '0', \`descuento3\` float NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_76d172d1f8d1af686048b142ad\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`cotizacion\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`usuarioCotizaId\` int NOT NULL, \`usuarioAutorizaId\` int NOT NULL, \`folio\` text NOT NULL, \`fecha\` timestamp NULL, \`status\` enum ('en proceso', 'aprobada') NOT NULL DEFAULT 'en proceso', \`TotalP1\` decimal NULL, \`facturaP1\` tinyint NOT NULL DEFAULT '0', \`formaPagoP1\` tinyint NOT NULL DEFAULT '0', \`TotalP2\` decimal NULL, \`facturaP2\` tinyint NOT NULL DEFAULT '0', \`formaPagoP2\` tinyint NOT NULL DEFAULT '0', \`totalP3\` decimal NULL, \`facturaP3\` tinyint NOT NULL DEFAULT '0', \`formaPagoP3\` tinyint NOT NULL DEFAULT '0', \`solicitudId\` int NOT NULL, UNIQUE INDEX \`IDX_ea1a25fe01a7fbf60819abf3b3\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`comprasDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`total\` decimal NOT NULL DEFAULT '0', \`cantidad\` decimal(10,2) NOT NULL DEFAULT '0.00', \`proveedorId\` int NOT NULL, \`insumoId\` int NOT NULL, \`compraId\` int NOT NULL, UNIQUE INDEX \`IDX_8beeb3e413ead9af9d55d5d0fa\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`secciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`menuId\` int NOT NULL, UNIQUE INDEX \`IDX_e67bd8ef94c717102a93f58f4d\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_69aca9e46979f8eff3286c739c\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`fecha\` date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`folio\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`status\` enum ('Borrador', 'Enviado', 'Aceptado', 'Rechazado', 'Finalizado') NOT NULL DEFAULT 'Borrador'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`cotizacionId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` ADD \`descripcion\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` ADD \`imagen\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` ADD \`existencia\` decimal NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` ADD \`seccionId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` CHANGE \`maximo\` \`maximo\` int NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` CHANGE \`minimo\` \`minimo\` int NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitudDetalle\` ADD CONSTRAINT \`FK_d29377336faa636ba9e93c684ef\` FOREIGN KEY (\`solicitudId\`) REFERENCES \`softres\`.\`solicitud\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitudDetalle\` ADD CONSTRAINT \`FK_7ec8534a37e0cc824256f304d7f\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitud\` ADD CONSTRAINT \`FK_74032512b30ba6ae5d3621bc2b5\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_d3ce2c530e81094d4f30f9984d0\` FOREIGN KEY (\`cotizacionId\`) REFERENCES \`softres\`.\`cotizacion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_0f8cd4e35a27951e4f8bc673ae1\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_44402e19b1e67f6d6199e88a41a\` FOREIGN KEY (\`proveedor1Id\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_865338abc1ee9625122097caee7\` FOREIGN KEY (\`proveedor2Id\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_a9879e2bccd79c82fae7a9226e1\` FOREIGN KEY (\`proveedor3Id\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_1db722372f1c6645e474bcbe87f\` FOREIGN KEY (\`proveedorSeleccionadoId\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_05a85aad36f87ef843dc77e4396\` FOREIGN KEY (\`usuarioCotizaId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_bef9b7f37e0f363427f58a8a3f6\` FOREIGN KEY (\`usuarioAutorizaId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_fdff2bc25fe65929b37c094ebb7\` FOREIGN KEY (\`solicitudId\`) REFERENCES \`softres\`.\`solicitud\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_2619a5384034bf2de98229a5ace\` FOREIGN KEY (\`proveedorId\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_4eca7cf8b89d19a4c2762921ee9\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_414bcbe311a2714adc91e2ff111\` FOREIGN KEY (\`compraId\`) REFERENCES \`softres\`.\`compras\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD CONSTRAINT \`FK_3237c20b916be0b19192f2c5ce5\` FOREIGN KEY (\`cotizacionId\`) REFERENCES \`softres\`.\`cotizacion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` ADD CONSTRAINT \`FK_6fadd691458b08709415b7e58d0\` FOREIGN KEY (\`seccionId\`) REFERENCES \`softres\`.\`secciones\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`secciones\` ADD CONSTRAINT \`FK_58ed97360f830135991d063864b\` FOREIGN KEY (\`menuId\`) REFERENCES \`softres\`.\`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`secciones\` DROP FOREIGN KEY \`FK_58ed97360f830135991d063864b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` DROP FOREIGN KEY \`FK_6fadd691458b08709415b7e58d0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP FOREIGN KEY \`FK_3237c20b916be0b19192f2c5ce5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_414bcbe311a2714adc91e2ff111\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_4eca7cf8b89d19a4c2762921ee9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_2619a5384034bf2de98229a5ace\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_fdff2bc25fe65929b37c094ebb7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_bef9b7f37e0f363427f58a8a3f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_05a85aad36f87ef843dc77e4396\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_1db722372f1c6645e474bcbe87f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_a9879e2bccd79c82fae7a9226e1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_865338abc1ee9625122097caee7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_44402e19b1e67f6d6199e88a41a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_0f8cd4e35a27951e4f8bc673ae1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_d3ce2c530e81094d4f30f9984d0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitud\` DROP FOREIGN KEY \`FK_74032512b30ba6ae5d3621bc2b5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitudDetalle\` DROP FOREIGN KEY \`FK_7ec8534a37e0cc824256f304d7f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitudDetalle\` DROP FOREIGN KEY \`FK_d29377336faa636ba9e93c684ef\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` CHANGE \`minimo\` \`minimo\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` CHANGE \`maximo\` \`maximo\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`seccionId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`existencia\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`imagen\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`descripcion\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`cotizacionId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`folio\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`fecha\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_69aca9e46979f8eff3286c739c\` ON \`softres\`.\`menus\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`menus\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e67bd8ef94c717102a93f58f4d\` ON \`softres\`.\`secciones\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`secciones\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8beeb3e413ead9af9d55d5d0fa\` ON \`softres\`.\`comprasDetalle\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`comprasDetalle\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ea1a25fe01a7fbf60819abf3b3\` ON \`softres\`.\`cotizacion\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`cotizacion\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_76d172d1f8d1af686048b142ad\` ON \`softres\`.\`cotizacionDetalle\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`cotizacionDetalle\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_d817112cdf0f7e406f60b883c4\` ON \`softres\`.\`solicitud\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`solicitud\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_047844d787ae4285998c456bfe\` ON \`softres\`.\`solicitudDetalle\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`solicitudDetalle\``);
  }
}
