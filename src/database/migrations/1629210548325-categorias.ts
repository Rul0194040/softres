import {MigrationInterface, QueryRunner} from "typeorm";

export class categorias1629210548325 implements MigrationInterface {
    name = 'categorias1629210548325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` DROP FOREIGN KEY \`FK_792aa55afe66e4dfe8156af867a\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` DROP FOREIGN KEY \`FK_b14f1b2a69bb9e88d1240a2cda7\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` ADD CONSTRAINT \`FK_792aa55afe66e4dfe8156af867a\` FOREIGN KEY (\`insumo\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` ADD CONSTRAINT \`FK_b14f1b2a69bb9e88d1240a2cda7\` FOREIGN KEY (\`categoria\`) REFERENCES \`softres\`.\`categoria\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` DROP FOREIGN KEY \`FK_b14f1b2a69bb9e88d1240a2cda7\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` DROP FOREIGN KEY \`FK_792aa55afe66e4dfe8156af867a\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` ADD CONSTRAINT \`FK_b14f1b2a69bb9e88d1240a2cda7\` FOREIGN KEY (\`categoria\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` ADD CONSTRAINT \`FK_792aa55afe66e4dfe8156af867a\` FOREIGN KEY (\`insumo\`) REFERENCES \`softres\`.\`categoria\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
