import {MigrationInterface, QueryRunner} from "typeorm";

export class solicitud1631725441440 implements MigrationInterface {
    name = 'solicitud1631725441440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`softres\`.\`solicitud\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`fecha\` date NOT NULL, \`folio\` text NOT NULL, \`depto\` enum ('COCINA', 'BARRA', 'ALMACÉN') NOT NULL DEFAULT 'COCINA', UNIQUE INDEX \`IDX_d817112cdf0f7e406f60b883c4\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`cotizacionDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`cotizacionId\` int NOT NULL, \`insumoId\` int NOT NULL, \`proveedor1Id\` int NULL, \`proveedor2Id\` int NULL, \`proveedor3Id\` int NULL, \`proveedorSeleccionadoId\` int NULL, \`precio1\` float NOT NULL DEFAULT '0', \`precio2\` float NOT NULL DEFAULT '0', \`precio3\` float NOT NULL DEFAULT '0', \`precioSeleccionado\` float NOT NULL DEFAULT '0', \`descuento1\` float NOT NULL DEFAULT '0', \`descuento2\` float NOT NULL DEFAULT '0', \`descuento3\` float NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_76d172d1f8d1af686048b142ad\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`cotizacion\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`usuarioId\` int NOT NULL, \`fecha\` timestamp NULL, \`status\` enum ('en proceso', 'aprobada') NOT NULL DEFAULT 'en proceso', \`solicitudId\` int NULL, UNIQUE INDEX \`IDX_ea1a25fe01a7fbf60819abf3b3\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`solicitudId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD \`solicitudId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`maximo\` \`maximo\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`minimo\` \`minimo\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_4eca7cf8b89d19a4c2762921ee9\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` CHANGE \`insumoId\` \`insumoId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`secciones\` DROP FOREIGN KEY \`FK_58ed97360f830135991d063864b\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`secciones\` CHANGE \`menuId\` \`menuId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_c623f71d2be3888742ab1a0303f\` FOREIGN KEY (\`solicitudId\`) REFERENCES \`softres\`.\`solicitud\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_4eca7cf8b89d19a4c2762921ee9\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_d3ce2c530e81094d4f30f9984d0\` FOREIGN KEY (\`cotizacionId\`) REFERENCES \`softres\`.\`cotizacion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_0f8cd4e35a27951e4f8bc673ae1\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_44402e19b1e67f6d6199e88a41a\` FOREIGN KEY (\`proveedor1Id\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_865338abc1ee9625122097caee7\` FOREIGN KEY (\`proveedor2Id\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_a9879e2bccd79c82fae7a9226e1\` FOREIGN KEY (\`proveedor3Id\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD CONSTRAINT \`FK_1db722372f1c6645e474bcbe87f\` FOREIGN KEY (\`proveedorSeleccionadoId\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_175f7adbc18f70a7a2e6414278e\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_fdff2bc25fe65929b37c094ebb7\` FOREIGN KEY (\`solicitudId\`) REFERENCES \`softres\`.\`solicitud\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`secciones\` ADD CONSTRAINT \`FK_58ed97360f830135991d063864b\` FOREIGN KEY (\`menuId\`) REFERENCES \`softres\`.\`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`secciones\` DROP FOREIGN KEY \`FK_58ed97360f830135991d063864b\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_fdff2bc25fe65929b37c094ebb7\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_175f7adbc18f70a7a2e6414278e\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_1db722372f1c6645e474bcbe87f\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_a9879e2bccd79c82fae7a9226e1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_865338abc1ee9625122097caee7\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_44402e19b1e67f6d6199e88a41a\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_0f8cd4e35a27951e4f8bc673ae1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP FOREIGN KEY \`FK_d3ce2c530e81094d4f30f9984d0\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_4eca7cf8b89d19a4c2762921ee9\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_c623f71d2be3888742ab1a0303f\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`secciones\` CHANGE \`menuId\` \`menuId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`secciones\` ADD CONSTRAINT \`FK_58ed97360f830135991d063864b\` FOREIGN KEY (\`menuId\`) REFERENCES \`softres\`.\`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` CHANGE \`insumoId\` \`insumoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_4eca7cf8b89d19a4c2762921ee9\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`minimo\` \`minimo\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`maximo\` \`maximo\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`solicitudId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`solicitudId\``);
        await queryRunner.query(`DROP INDEX \`IDX_ea1a25fe01a7fbf60819abf3b3\` ON \`softres\`.\`cotizacion\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`cotizacion\``);
        await queryRunner.query(`DROP INDEX \`IDX_76d172d1f8d1af686048b142ad\` ON \`softres\`.\`cotizacionDetalle\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`cotizacionDetalle\``);
        await queryRunner.query(`DROP INDEX \`IDX_d817112cdf0f7e406f60b883c4\` ON \`softres\`.\`solicitud\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`solicitud\``);
    }

}
