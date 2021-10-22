import {MigrationInterface, QueryRunner} from "typeorm";

export class cotizacion1634837439354 implements MigrationInterface {
    name = 'cotizacion1634837439354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_05a85aad36f87ef843dc77e4396\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_bef9b7f37e0f363427f58a8a3f6\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`usuarioCotizaId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`usuarioAutorizaId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`TotalP1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`facturaP1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`formaPagoP1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`TotalP2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`facturaP2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`formaPagoP2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`totalP3\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`facturaP3\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`formaPagoP3\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` ADD \`cantidad\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`total1\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`factura1\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`formaPago1\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`total2\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`factura2\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`formaPago2\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`total3\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`factura3\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`formaPago3\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`cotizaId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`autorizaId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` CHANGE \`status\` \`status\` enum ('borrador', 'en proceso', 'aprobada') NOT NULL DEFAULT 'borrador'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_6183522e2ff027a6c29b7fcca2f\` FOREIGN KEY (\`cotizaId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_807aa6a182383ec809d3e77cef1\` FOREIGN KEY (\`autorizaId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_807aa6a182383ec809d3e77cef1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP FOREIGN KEY \`FK_6183522e2ff027a6c29b7fcca2f\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`autorizaId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`cotizaId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`formaPago3\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`factura3\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`total3\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`formaPago2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`factura2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`total2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`formaPago1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`factura1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` DROP COLUMN \`total1\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacionDetalle\` DROP COLUMN \`cantidad\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`formaPagoP3\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`facturaP3\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`totalP3\` decimal(10,0) NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`formaPagoP2\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`facturaP2\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`TotalP2\` decimal(10,0) NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`formaPagoP1\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`facturaP1\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`TotalP1\` decimal(10,0) NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`usuarioAutorizaId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD \`usuarioCotizaId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` CHANGE \`status\` \`status\` enum ('en proceso', 'aprobada') NOT NULL DEFAULT 'en proceso'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_bef9b7f37e0f363427f58a8a3f6\` FOREIGN KEY (\`usuarioAutorizaId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`cotizacion\` ADD CONSTRAINT \`FK_05a85aad36f87ef843dc77e4396\` FOREIGN KEY (\`usuarioCotizaId\`) REFERENCES \`softres\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
