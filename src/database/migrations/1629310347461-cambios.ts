import {MigrationInterface, QueryRunner} from "typeorm";

export class cambios1629310347461 implements MigrationInterface {
    name = 'cambios1629310347461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD \`categoriaId\` int NULL`);
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_0d28ae68a8f742beb176aa51ae\` ON \`softres\`.\`insumos\` (\`nombre\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c5992ffac74013080133f9c5e1\` ON \`softres\`.\`insumos\` (\`categoriaId\`, \`nombre\`)`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_1acafbf46b10a4650b5935ee728\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`softres\`.\`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_1acafbf46b10a4650b5935ee728\``);
        await queryRunner.query(`DROP INDEX \`IDX_c5992ffac74013080133f9c5e1\` ON \`softres\`.\`insumos\``);
        await queryRunner.query(`DROP INDEX \`IDX_0d28ae68a8f742beb176aa51ae\` ON \`softres\`.\`insumos\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`categoriaId\``);
    }

}
