import {MigrationInterface, QueryRunner} from "typeorm";

export class ajustes1630614183060 implements MigrationInterface {
    name = 'ajustes1630614183060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`softres\`.\`proveedor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`email\` varchar(100) NULL DEFAULT '', \`telefono\` varchar(20) NULL DEFAULT '', \`descripcion\` varchar(200) NULL DEFAULT '', \`direccion\` varchar(350) NULL, \`contacto\` varchar(100) NULL, UNIQUE INDEX \`IDX_fbffe17281fe5563591eb900c9\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`recetasDetalle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`cantReal\` mediumint NULL, \`cantReceta\` mediumint NOT NULL, \`costoUnitarioReceta\` mediumint NOT NULL, \`insumoId\` int NULL, \`recetaId\` mediumint NULL, \`parentId\` int NOT NULL, UNIQUE INDEX \`IDX_fe86a44f968e34233fd51dce81\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`recetas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`numPorciones\` mediumint NULL, \`costoXporcion\` mediumint NULL, \`rendimiento\` mediumint NULL, \`costoTotal\` mediumint NULL, \`costoUnitarioReceta\` mediumint NULL, \`mermaReceta\` mediumint NULL, \`iva\` mediumint NULL, \`costoIva\` mediumint NULL, \`costoSinIva\` mediumint NULL, \`precioSugeridoCarta\` mediumint NULL, \`haschildren\` tinyint NOT NULL, \`grupo\` enum ('fuerte', 'complemento', 'extra', 'subreceta', 'extra/subreceta', 'complemento/subreceta') NULL, UNIQUE INDEX \`IDX_9c6bbb025a661bb198e0d91e0b\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`costoVenta\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`categorias\` ADD \`parentCatId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`pesoNeto\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`pesoDrenado\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`precioKilo\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`merma\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`mermaPorcentaje\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`proveedorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`subCategoriaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('ml', 'gr') NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`precioUnitario\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`precioUnitario\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`capacidad\` \`capacidad\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`categorias\` ADD CONSTRAINT \`FK_17629404357ca8b22b27a3c3692\` FOREIGN KEY (\`parentCatId\`) REFERENCES \`softres\`.\`categorias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_8868e4cb08cfb3515bfaeef0880\` FOREIGN KEY (\`proveedorId\`) REFERENCES \`softres\`.\`proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_cf78f903e02e388f5e8508643f2\` FOREIGN KEY (\`subCategoriaId\`) REFERENCES \`softres\`.\`categorias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD CONSTRAINT \`FK_f4a52e7383478fff0821b47277c\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD CONSTRAINT \`FK_2bd07cecede0803d81ee1c8f443\` FOREIGN KEY (\`parentId\`) REFERENCES \`softres\`.\`recetas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP FOREIGN KEY \`FK_2bd07cecede0803d81ee1c8f443\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP FOREIGN KEY \`FK_f4a52e7383478fff0821b47277c\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_cf78f903e02e388f5e8508643f2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_8868e4cb08cfb3515bfaeef0880\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`categorias\` DROP FOREIGN KEY \`FK_17629404357ca8b22b27a3c3692\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` CHANGE \`capacidad\` \`capacidad\` decimal(10,0) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`precioUnitario\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`precioUnitario\` mediumint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('Lt', 'pza', 'kg', 'ml', 'gr') NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`subCategoriaId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`proveedorId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`mermaPorcentaje\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`merma\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`precioKilo\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`pesoDrenado\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`pesoNeto\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`categorias\` DROP COLUMN \`parentCatId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`costoVenta\` mediumint NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_9c6bbb025a661bb198e0d91e0b\` ON \`softres\`.\`recetas\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`recetas\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe86a44f968e34233fd51dce81\` ON \`softres\`.\`recetasDetalle\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`recetasDetalle\``);
        await queryRunner.query(`DROP INDEX \`IDX_fbffe17281fe5563591eb900c9\` ON \`softres\`.\`proveedor\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`proveedor\``);
    }

}
