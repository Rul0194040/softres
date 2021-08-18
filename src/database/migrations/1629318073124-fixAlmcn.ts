import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAlmcn1629318073124 implements MigrationInterface {
    name = 'fixAlmcn1629318073124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP COLUMN \`existencias\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`categoriaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`capacidad\` decimal NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`cantidad\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('Lt', 'pza', 'kg') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`unidad\` \`unidad\` enum ('botella', 'bolsa', 'costal', 'cubeta', 'paquete', 'lata', 'caja', 'frasco', 'bidon', 'garrafa') NOT NULL`);
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_0d28ae68a8f742beb176aa51ae\` ON \`softres\`.\`insumos\` (\`nombre\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_47c2e83bcc01b5610a4a35e600\` ON \`softres\`.\`insumos\` (\`nombre\`, \`marca\`)`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_1acafbf46b10a4650b5935ee728\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`softres\`.\`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_1acafbf46b10a4650b5935ee728\``);
        await queryRunner.query(`DROP INDEX \`IDX_47c2e83bcc01b5610a4a35e600\` ON \`softres\`.\`insumos\``);
        await queryRunner.query(`DROP INDEX \`IDX_0d28ae68a8f742beb176aa51ae\` ON \`softres\`.\`insumos\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`unidad\` \`unidad\` enum ('bidon', 'garrafa', 'bolsa', 'frasco', 'botella', 'caja', 'lata', 'cubeta', 'paquete') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('Lt', 'kg') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`cantidad\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`capacidad\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`categoriaId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` ADD \`existencias\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    }

}
