import { MigrationInterface, QueryRunner } from 'typeorm';

export class twoMonths1633122264293 implements MigrationInterface {
  name = 'twoMonths1633122264293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`almacenDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`almacenId\` int NOT NULL, \`fecha\` date NULL, \`referencia\` varchar(25) NOT NULL, \`entradas\` decimal(10,2) NOT NULL DEFAULT '0.00', \`salidas\` decimal(10,2) NOT NULL DEFAULT '0.00', \`existencias\` decimal(10,2) NOT NULL DEFAULT '0.00', \`precioUnitario\` decimal(10,2) NOT NULL, \`precioMedio\` decimal(10,2) NOT NULL DEFAULT '0.00', \`cargo\` decimal(10,2) NOT NULL DEFAULT '0.00', \`abono\` decimal(10,2) NOT NULL DEFAULT '0.00', \`saldo\` decimal(10,2) NOT NULL, UNIQUE INDEX \`IDX_eeb7b920b0758a46ce99bf0a3a\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`categorias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`parentCatId\` int NULL, UNIQUE INDEX \`IDX_e3619e505b1c0ee392a6034466\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`proveedor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`email\` varchar(100) NULL DEFAULT '', \`telefono\` varchar(20) NULL DEFAULT '', \`descripcion\` varchar(200) NULL DEFAULT '', \`direccion\` varchar(350) NULL, \`contacto\` varchar(100) NULL, UNIQUE INDEX \`IDX_fbffe17281fe5563591eb900c9\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`insumos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`medida\` enum ('ml', 'gr') NULL, \`unidad\` enum ('botella', 'bolsa', 'costal', 'cubeta', 'paquete', 'lata', 'caja', 'frasco', 'bidon', 'garrafa') NOT NULL, \`marca\` varchar(100) NOT NULL, \`precioUnitario\` decimal(10,2) NOT NULL, \`pesoNeto\` decimal(10,2) NOT NULL, \`pesoDrenado\` decimal(10,2) NULL, \`precioKilo\` decimal(10,2) NOT NULL, \`merma\` decimal(10,2) NULL, \`mermaPorcentaje\` decimal(10,2) NOT NULL, \`proveedorId\` int NULL, \`categoriaId\` int NULL, \`subCategoriaId\` int NULL, FULLTEXT INDEX \`IDX_0d28ae68a8f742beb176aa51ae\` (\`nombre\`), UNIQUE INDEX \`IDX_47c2e83bcc01b5610a4a35e600\` (\`nombre\`, \`marca\`), UNIQUE INDEX \`IDX_8660e0a51b002f2afa8fed1e76\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`almacen\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`type\` enum ('PROMEDIOS', 'UEPS', 'PEPS') NOT NULL DEFAULT 'PROMEDIOS', \`depto\` enum ('COCINA', 'BARRA', 'ALMACÉN') NOT NULL DEFAULT 'COCINA', \`maximo\` int NULL DEFAULT '0', \`minimo\` int NULL DEFAULT '0', \`cantidad\` decimal(10,2) NOT NULL DEFAULT '0.00', \`total\` mediumint NOT NULL, \`insumoId\` int NOT NULL, UNIQUE INDEX \`IDX_1eb9957ecfeca91dcf0bfe2130\` (\`insumoId\`, \`depto\`), UNIQUE INDEX \`IDX_f5261de086b3c1e396804ff07a\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`solicitudDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`solicitudId\` int NOT NULL, \`cantidad\` int NOT NULL, \`abastecido\` tinyint NULL DEFAULT 0, \`insumoId\` int NULL, UNIQUE INDEX \`IDX_047844d787ae4285998c456bfe\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL, \`picUrl\` varchar(250) NULL, \`profile\` varchar(50) NOT NULL, \`rules\` text NULL, \`email\` varchar(100) NOT NULL, \`validEmail\` tinyint NOT NULL DEFAULT 0, \`emailToken\` varchar(6) NULL, \`password\` varchar(100) NOT NULL, \`jwt\` text NULL, \`passwordToken\` varchar(500) NULL, \`passwordTokenDate\` timestamp NULL, UNIQUE INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
      `CREATE TABLE \`softres\`.\`compras\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`fecha\` date NOT NULL, \`folio\` text NOT NULL, \`status\` enum ('Borrador', 'Enviado', 'Aceptado', 'Rechazado', 'Finalizado') NOT NULL DEFAULT 'Borrador', \`cotizacionId\` int NOT NULL, UNIQUE INDEX \`IDX_b9833b86d242aff7a6c1c33d73\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`recetasDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`cantReal\` mediumint NULL, \`cantReceta\` mediumint NOT NULL, \`costoUnitarioIngrediente\` mediumint NOT NULL, \`insumoId\` int NULL, \`parentId\` int NOT NULL, UNIQUE INDEX \`IDX_fe86a44f968e34233fd51dce81\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`recetas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`depto\` enum ('COCINA', 'BARRA', 'ALMACÉN') NOT NULL DEFAULT 'COCINA', \`descripcion\` varchar(100) NULL, \`numPorciones\` mediumint NULL, \`costoXporcion\` mediumint NULL, \`rendimiento\` mediumint NULL, \`costoTotal\` mediumint NULL, \`costoUnitarioReceta\` mediumint NULL, \`mermaReceta\` mediumint NULL, \`iva\` mediumint NULL, \`costoIva\` mediumint NULL, \`costoSinIva\` mediumint NULL, \`precioSugeridoCarta\` mediumint NULL, \`haschildren\` tinyint NOT NULL, \`grupo\` enum ('fuerte', 'complemento', 'extra', 'subreceta', 'extra/subreceta', 'complemento/subreceta') NULL, \`imagen\` varchar(20) NULL, \`existencia\` decimal NOT NULL DEFAULT '0', \`parentId\` int NULL, \`seccionId\` int NULL, UNIQUE INDEX \`IDX_9c6bbb025a661bb198e0d91e0b\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`secciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`menuId\` int NOT NULL, UNIQUE INDEX \`IDX_e67bd8ef94c717102a93f58f4d\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`depto\` enum ('COCINA', 'BARRA', 'ALMACÉN') NOT NULL DEFAULT 'COCINA', UNIQUE INDEX \`IDX_69aca9e46979f8eff3286c739c\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`ventas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_3ed9f17ae386011d90a743b9cd\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacenDetalle\` ADD CONSTRAINT \`FK_f707039c03ee56b2b0006763dcd\` FOREIGN KEY (\`almacenId\`) REFERENCES \`softres\`.\`almacen\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`categorias\` ADD CONSTRAINT \`FK_17629404357ca8b22b27a3c3692\` FOREIGN KEY (\`parentCatId\`) REFERENCES \`softres\`.\`categorias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_8868e4cb08cfb3515bfaeef0880\` FOREIGN KEY (\`proveedorId\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_1acafbf46b10a4650b5935ee728\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`softres\`.\`categorias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_cf78f903e02e388f5e8508643f2\` FOREIGN KEY (\`subCategoriaId\`) REFERENCES \`softres\`.\`categorias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD CONSTRAINT \`FK_c85f240d18929e2bcf14dba4f2e\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`softres\`.\`recetasDetalle\` ADD CONSTRAINT \`FK_f4a52e7383478fff0821b47277c\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetasDetalle\` ADD CONSTRAINT \`FK_2bd07cecede0803d81ee1c8f443\` FOREIGN KEY (\`parentId\`) REFERENCES \`softres\`.\`recetas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` ADD CONSTRAINT \`FK_a6283aa9ded0655f8559993531f\` FOREIGN KEY (\`parentId\`) REFERENCES \`softres\`.\`recetas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`softres\`.\`recetas\` DROP FOREIGN KEY \`FK_a6283aa9ded0655f8559993531f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetasDetalle\` DROP FOREIGN KEY \`FK_2bd07cecede0803d81ee1c8f443\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetasDetalle\` DROP FOREIGN KEY \`FK_f4a52e7383478fff0821b47277c\``,
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
      `ALTER TABLE \`softres\`.\`almacen\` DROP FOREIGN KEY \`FK_c85f240d18929e2bcf14dba4f2e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_cf78f903e02e388f5e8508643f2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_1acafbf46b10a4650b5935ee728\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_8868e4cb08cfb3515bfaeef0880\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`categorias\` DROP FOREIGN KEY \`FK_17629404357ca8b22b27a3c3692\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacenDetalle\` DROP FOREIGN KEY \`FK_f707039c03ee56b2b0006763dcd\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3ed9f17ae386011d90a743b9cd\` ON \`softres\`.\`ventas\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`ventas\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_69aca9e46979f8eff3286c739c\` ON \`softres\`.\`menus\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`menus\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e67bd8ef94c717102a93f58f4d\` ON \`softres\`.\`secciones\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`secciones\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_9c6bbb025a661bb198e0d91e0b\` ON \`softres\`.\`recetas\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`recetas\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fe86a44f968e34233fd51dce81\` ON \`softres\`.\`recetasDetalle\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`recetasDetalle\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b9833b86d242aff7a6c1c33d73\` ON \`softres\`.\`compras\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`compras\``);
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
      `DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`softres\`.\`users\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_047844d787ae4285998c456bfe\` ON \`softres\`.\`solicitudDetalle\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`solicitudDetalle\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_f5261de086b3c1e396804ff07a\` ON \`softres\`.\`almacen\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1eb9957ecfeca91dcf0bfe2130\` ON \`softres\`.\`almacen\``,
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
      `DROP INDEX \`IDX_fbffe17281fe5563591eb900c9\` ON \`softres\`.\`proveedor\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`proveedor\``);
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
