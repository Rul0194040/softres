import {MigrationInterface, QueryRunner} from "typeorm";

export class contable1634494399619 implements MigrationInterface {
    name = 'contable1634494399619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`softres\`.\`contableDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`fecha\` date NULL, \`referencia\` varchar(25) NOT NULL, \`entradas\` decimal(6,3) NOT NULL DEFAULT '0.000', \`salidas\` decimal(6,3) NOT NULL DEFAULT '0.000', \`existencias\` decimal(6,3) NOT NULL DEFAULT '0.000', \`precioUnitario\` decimal(10,2) NOT NULL, \`precioMedio\` decimal(10,2) NOT NULL DEFAULT '0.00', \`cargo\` decimal(10,2) NOT NULL DEFAULT '0.00', \`abono\` decimal(10,2) NOT NULL DEFAULT '0.00', \`saldo\` decimal(10,2) NOT NULL DEFAULT '0.00', \`contableId\` int NOT NULL, UNIQUE INDEX \`IDX_6b11ffc74c35d2f8cbbdb1010a\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`contable\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`insumoId\` int NOT NULL, UNIQUE INDEX \`IDX_4ace8fd36437b446e5acc3c6ae\` (\`uuid\`), UNIQUE INDEX \`REL_23ae9bb6fd01e366d18e196335\` (\`insumoId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`haschildren\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitud\` CHANGE \`status\` \`status\` enum ('borrador', 'generada', 'para_compras', 'completada') NULL DEFAULT 'borrador'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP FOREIGN KEY \`FK_f4a52e7383478fff0821b47277c\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` CHANGE \`insumoId\` \`insumoId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` CHANGE \`grupo\` \`grupo\` enum ('fuerte', 'complemento', 'extra', 'subreceta') NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`contableDetalle\` ADD CONSTRAINT \`FK_05617bb8f8bd9fdf8ea8162aa8a\` FOREIGN KEY (\`contableId\`) REFERENCES \`softres\`.\`contable\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`contable\` ADD CONSTRAINT \`FK_23ae9bb6fd01e366d18e1963357\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD CONSTRAINT \`FK_f4a52e7383478fff0821b47277c\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP FOREIGN KEY \`FK_f4a52e7383478fff0821b47277c\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`contable\` DROP FOREIGN KEY \`FK_23ae9bb6fd01e366d18e1963357\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`contableDetalle\` DROP FOREIGN KEY \`FK_05617bb8f8bd9fdf8ea8162aa8a\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` CHANGE \`grupo\` \`grupo\` enum ('fuerte', 'complemento', 'extra', 'subreceta', 'extra/subreceta', 'complemento/subreceta') NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` CHANGE \`insumoId\` \`insumoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD CONSTRAINT \`FK_f4a52e7383478fff0821b47277c\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`solicitud\` CHANGE \`status\` \`status\` enum ('generada', 'revision', 'completada') NULL DEFAULT 'generada'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`haschildren\` tinyint NOT NULL`);
        await queryRunner.query(`DROP INDEX \`REL_23ae9bb6fd01e366d18e196335\` ON \`softres\`.\`contable\``);
        await queryRunner.query(`DROP INDEX \`IDX_4ace8fd36437b446e5acc3c6ae\` ON \`softres\`.\`contable\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`contable\``);
        await queryRunner.query(`DROP INDEX \`IDX_6b11ffc74c35d2f8cbbdb1010a\` ON \`softres\`.\`contableDetalle\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`contableDetalle\``);
    }

}
