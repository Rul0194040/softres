import {MigrationInterface, QueryRunner} from "typeorm";

export class fixjoinColums1629412591281 implements MigrationInterface {
    name = 'fixjoinColums1629412591281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`insumoId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`insumoId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD UNIQUE INDEX \`IDX_c85f240d18929e2bcf14dba4f2\` (\`insumoId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c85f240d18929e2bcf14dba4f2\` ON \`softres\`.\`almacen\` (\`insumoId\`)`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD CONSTRAINT \`FK_c85f240d18929e2bcf14dba4f2e\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP FOREIGN KEY \`FK_c85f240d18929e2bcf14dba4f2e\``);
        await queryRunner.query(`DROP INDEX \`REL_c85f240d18929e2bcf14dba4f2\` ON \`softres\`.\`almacen\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP INDEX \`IDX_c85f240d18929e2bcf14dba4f2\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`insumoId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`almacen\` ADD \`insumoId\` mediumint NOT NULL`);
    }

}
