import {MigrationInterface, QueryRunner} from "typeorm";

export class proveedor1630574230928 implements MigrationInterface {
    name = 'proveedor1630574230928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP FOREIGN KEY \`FK_2bd07cecede0803d81ee1c8f443\``);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`proveedor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`email\` varchar(100) NULL DEFAULT '', \`telefono\` varchar(20) NULL DEFAULT '', \`descripcion\` varchar(200) NULL DEFAULT '', \`direccion\` varchar(350) NULL, \`contacto\` varchar(100) NULL, UNIQUE INDEX \`IDX_fbffe17281fe5563591eb900c9\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`rendimiento\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`mermaReceta\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`iva\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`haschildren\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`grupo\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`costoXporcion\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`costoUnitarioReceta\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`recetaId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`parentId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`proveedorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`merma\` mediumint NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`factorAlimentos\` mediumint NULL DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`rendimiento\` mediumint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`numXporcion\` mediumint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`nombre\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`precioMercado\` mediumint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP FOREIGN KEY \`FK_f4a52e7383478fff0821b47277c\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` CHANGE \`numPorciones\` \`numPorciones\` mediumint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` CHANGE \`cantReal\` \`cantReal\` mediumint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` CHANGE \`insumoId\` \`insumoId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_8868e4cb08cfb3515bfaeef0880\` FOREIGN KEY (\`proveedorId\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD CONSTRAINT \`FK_f4a52e7383478fff0821b47277c\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP FOREIGN KEY \`FK_f4a52e7383478fff0821b47277c\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_8868e4cb08cfb3515bfaeef0880\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` CHANGE \`insumoId\` \`insumoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` CHANGE \`cantReal\` \`cantReal\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` CHANGE \`numPorciones\` \`numPorciones\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD CONSTRAINT \`FK_f4a52e7383478fff0821b47277c\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`precioMercado\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`numXporcion\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`rendimiento\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`factorAlimentos\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`merma\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`proveedorId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`parentId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`recetaId\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`costoUnitarioReceta\` mediumint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`costoXporcion\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`grupo\` enum ('extra', 'subreceta', 'extra/subreceta') NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`haschildren\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`iva\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`mermaReceta\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`rendimiento\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`nombre\` varchar(100) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_fbffe17281fe5563591eb900c9\` ON \`softres\`.\`proveedor\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`proveedor\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD CONSTRAINT \`FK_2bd07cecede0803d81ee1c8f443\` FOREIGN KEY (\`parentId\`) REFERENCES \`softres\`.\`recetas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
