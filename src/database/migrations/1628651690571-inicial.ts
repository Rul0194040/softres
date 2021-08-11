import {MigrationInterface, QueryRunner} from "typeorm";

export class inicial1628651690571 implements MigrationInterface {
    name = 'inicial1628651690571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`softres\`.\`insumos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_8660e0a51b002f2afa8fed1e76\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`almacen\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`type\` enum ('PROMEDIOS', 'UEPS', 'PEPS') NOT NULL DEFAULT 'PROMEDIOS', \`unidad\` varchar(25) NOT NULL, \`insumoId\` int NULL, UNIQUE INDEX \`IDX_f5261de086b3c1e396804ff07a\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`compras\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_b9833b86d242aff7a6c1c33d73\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`ventas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_3ed9f17ae386011d90a743b9cd\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`almacen-Detalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`almacenId\` int NOT NULL, \`ventaId\` int NULL, \`compraId\` int NULL, \`fecha\` date NULL, \`referencia\` varchar(25) NOT NULL, \`entradas\` decimal(10,2) NOT NULL DEFAULT '0.00', \`salidas\` decimal(10,2) NOT NULL DEFAULT '0.00', \`existencias\` decimal(10,2) NOT NULL DEFAULT '0.00', \`precioUnitario\` decimal(10,2) NOT NULL DEFAULT '0.00', \`precioMedio\` decimal(10,2) NOT NULL DEFAULT '0.00', \`cargo\` decimal(10,2) NOT NULL DEFAULT '0.00', \`abono\` decimal(10,2) NOT NULL DEFAULT '0.00', \`saldo\` decimal(10,2) NOT NULL DEFAULT '0.00', UNIQUE INDEX \`IDX_f3acde8d3de672ea294189521c\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL, \`picUrl\` varchar(250) NULL, \`profile\` varchar(50) NOT NULL, \`rules\` text NULL, \`email\` varchar(100) NOT NULL, \`validEmail\` tinyint NOT NULL DEFAULT 0, \`emailToken\` varchar(6) NULL, \`password\` varchar(100) NOT NULL, \`jwt\` text NULL, \`passwordToken\` varchar(500) NULL, \`passwordTokenDate\` timestamp NULL, UNIQUE INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` ADD CONSTRAINT \`FK_d58da4be866de5215426c3a5052\` FOREIGN KEY (\`almacenId\`) REFERENCES \`softres\`.\`almacen\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP FOREIGN KEY \`FK_d58da4be866de5215426c3a5052\``);
        await queryRunner.query(`DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`softres\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_f3acde8d3de672ea294189521c\` ON \`softres\`.\`almacen-Detalle\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`almacen-Detalle\``);
        await queryRunner.query(`DROP INDEX \`IDX_3ed9f17ae386011d90a743b9cd\` ON \`softres\`.\`ventas\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`ventas\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9833b86d242aff7a6c1c33d73\` ON \`softres\`.\`compras\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`compras\``);
        await queryRunner.query(`DROP INDEX \`IDX_f5261de086b3c1e396804ff07a\` ON \`softres\`.\`almacen\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`almacen\``);
        await queryRunner.query(`DROP INDEX \`IDX_8660e0a51b002f2afa8fed1e76\` ON \`softres\`.\`insumos\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`insumos\``);
    }

}
