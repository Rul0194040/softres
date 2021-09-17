import {MigrationInterface, QueryRunner} from "typeorm";

export class soliDetalle1631905826055 implements MigrationInterface {
    name = 'soliDetalle1631905826055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_c623f71d2be3888742ab1a0303f\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_175f7adbc18f70a7a2e6414278e\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP FOREIGN KEY \`FK_ccbc87d4d0703f780e5f55f1f04\``);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`solicitudDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`solicitudId\` int NOT NULL, \`cantidad\` int NOT NULL, \`insumoId\` int NULL, UNIQUE INDEX \`IDX_047844d787ae4285998c456bfe\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`solicitudId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`usuarioId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`descuento\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`pagado\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`factura\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`formaPago\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`fechaEntrega\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`proveedorId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`solicitudId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitud\` ADD \`usuarioId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitud\` ADD \`status\` enum ('generada', 'revision', 'completada') NULL DEFAULT 'generada'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`usuarioCotizaId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`usuarioAutorizaId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`folio\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`TotalP1\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`facturaP1\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`formaPagoP1\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`TotalP2\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`facturaP2\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`formaPagoP2\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`totalP3\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`facturaP3\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`formaPagoP3\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` ADD \`proveedorId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD \`cotizacionId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_fdff2bc25fe65929b37c094ebb7\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` CHANGE \`solicitudId\` \`solicitudId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` CHANGE \`total\` \`total\` decimal NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitudDetalle\` ADD CONSTRAINT \`FK_d29377336faa636ba9e93c684ef\` FOREIGN KEY (\`solicitudId\`) REFERENCES \`softres\`.\`solicitud\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitudDetalle\` ADD CONSTRAINT \`FK_7ec8534a37e0cc824256f304d7f\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitud\` ADD CONSTRAINT \`FK_74032512b30ba6ae5d3621bc2b5\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_05a85aad36f87ef843dc77e4396\` FOREIGN KEY (\`usuarioCotizaId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_bef9b7f37e0f363427f58a8a3f6\` FOREIGN KEY (\`usuarioAutorizaId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_fdff2bc25fe65929b37c094ebb7\` FOREIGN KEY (\`solicitudId\`) REFERENCES \`softres\`.\`solicitud\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_2619a5384034bf2de98229a5ace\` FOREIGN KEY (\`proveedorId\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD CONSTRAINT \`FK_3237c20b916be0b19192f2c5ce5\` FOREIGN KEY (\`cotizacionId\`) REFERENCES \`softres\`.\`cotizacion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP FOREIGN KEY \`FK_3237c20b916be0b19192f2c5ce5\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_2619a5384034bf2de98229a5ace\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_fdff2bc25fe65929b37c094ebb7\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_bef9b7f37e0f363427f58a8a3f6\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_05a85aad36f87ef843dc77e4396\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitud\` DROP FOREIGN KEY \`FK_74032512b30ba6ae5d3621bc2b5\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitudDetalle\` DROP FOREIGN KEY \`FK_7ec8534a37e0cc824256f304d7f\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitudDetalle\` DROP FOREIGN KEY \`FK_d29377336faa636ba9e93c684ef\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` CHANGE \`total\` \`total\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` CHANGE \`solicitudId\` \`solicitudId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_fdff2bc25fe65929b37c094ebb7\` FOREIGN KEY (\`solicitudId\`) REFERENCES \`softres\`.\`solicitud\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`cotizacionId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`comprasDetalle\` DROP COLUMN \`proveedorId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`formaPagoP3\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`facturaP3\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`totalP3\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`formaPagoP2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`facturaP2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`TotalP2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`formaPagoP1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`facturaP1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`TotalP1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`folio\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`usuarioAutorizaId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`usuarioCotizaId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitud\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitud\` DROP COLUMN \`usuarioId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD \`solicitudId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD \`proveedorId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD \`fechaEntrega\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD \`formaPago\` enum ('Credito', 'Contado') NOT NULL DEFAULT 'Credito'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD \`factura\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD \`pagado\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD \`total\` decimal(10,0) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD \`descuento\` decimal(10,0) NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`usuarioId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`solicitudId\` int NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_047844d787ae4285998c456bfe\` ON \`softres\`.\`solicitudDetalle\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`solicitudDetalle\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`compras\` ADD CONSTRAINT \`FK_ccbc87d4d0703f780e5f55f1f04\` FOREIGN KEY (\`proveedorId\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_175f7adbc18f70a7a2e6414278e\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_c623f71d2be3888742ab1a0303f\` FOREIGN KEY (\`solicitudId\`) REFERENCES \`softres\`.\`solicitud\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
