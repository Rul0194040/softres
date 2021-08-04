import {MigrationInterface, QueryRunner} from "typeorm";

export class inicial1628058467378 implements MigrationInterface {
    name = 'inicial1628058467378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`softres\`.\`insumo_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_c71895524d42bf6f9bbba4424f\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`almacen_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`type\` enum ('PROMEDIOS', 'UEPS', 'PEPS') NOT NULL DEFAULT 'PROMEDIOS', \`unidad\` varchar(25) NOT NULL, \`insumoId\` int NULL, UNIQUE INDEX \`IDX_a711fa9104a333677787cdb8dd\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`compra_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_8883f80bbe87e4d290e555e527\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`venta_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_bcccae798c7a2993a8f0412f5c\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`almacen_detalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`almacenId\` int NOT NULL, \`ventaId\` int NULL, \`compraId\` int NULL, \`fecha\` date NULL, \`referencia\` varchar(25) NOT NULL, \`entradas\` decimal(10,2) NOT NULL DEFAULT '0.00', \`salidas\` decimal(10,2) NOT NULL DEFAULT '0.00', \`existencias\` decimal(10,2) NOT NULL DEFAULT '0.00', \`precioUnitario\` decimal(10,2) NOT NULL DEFAULT '0.00', \`precioMedio\` decimal(10,2) NOT NULL DEFAULT '0.00', \`cargo\` decimal(10,2) NOT NULL DEFAULT '0.00', \`abono\` decimal(10,2) NOT NULL DEFAULT '0.00', \`saldo\` decimal(10,2) NOT NULL DEFAULT '0.00', UNIQUE INDEX \`IDX_17e4556ffe7cfe9a0e8bd6dcfb\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL, \`profile\` varchar(50) NOT NULL, \`email\` varchar(100) NOT NULL, \`validEmail\` tinyint NOT NULL DEFAULT 0, \`emailToken\` varchar(6) NULL, \`password\` varchar(100) NOT NULL, \`passwordToken\` varchar(500) NULL, \`passwordTokenDate\` timestamp NULL, UNIQUE INDEX \`IDX_a95e949168be7b7ece1a2382fe\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen_detalle\` ADD CONSTRAINT \`FK_4ff23a918728983699ad679d415\` FOREIGN KEY (\`almacenId\`) REFERENCES \`softres\`.\`almacen_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen_detalle\` DROP FOREIGN KEY \`FK_4ff23a918728983699ad679d415\``);
        await queryRunner.query(`DROP INDEX \`IDX_a95e949168be7b7ece1a2382fe\` ON \`softres\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_17e4556ffe7cfe9a0e8bd6dcfb\` ON \`softres\`.\`almacen_detalle\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`almacen_detalle\``);
        await queryRunner.query(`DROP INDEX \`IDX_bcccae798c7a2993a8f0412f5c\` ON \`softres\`.\`venta_entity\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`venta_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_8883f80bbe87e4d290e555e527\` ON \`softres\`.\`compra_entity\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`compra_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_a711fa9104a333677787cdb8dd\` ON \`softres\`.\`almacen_entity\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`almacen_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_c71895524d42bf6f9bbba4424f\` ON \`softres\`.\`insumo_entity\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`insumo_entity\``);
    }

}
