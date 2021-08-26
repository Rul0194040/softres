import {MigrationInterface, QueryRunner} from "typeorm";

export class siHayExistencias1630006008844 implements MigrationInterface {
    name = 'siHayExistencias1630006008844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_7ea7a6f310e9ea6d7c25fd8c59\` ON \`softres\`.\`categorias\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` ADD \`existencias\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`categorias\` ADD UNIQUE INDEX \`IDX_e3619e505b1c0ee392a6034466\` (\`uuid\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`categorias\` DROP INDEX \`IDX_e3619e505b1c0ee392a6034466\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP COLUMN \`existencias\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_7ea7a6f310e9ea6d7c25fd8c59\` ON \`softres\`.\`categorias\` (\`uuid\`)`);
    }

}
