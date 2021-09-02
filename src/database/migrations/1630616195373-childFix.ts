import {MigrationInterface, QueryRunner} from "typeorm";

export class childFix1630616195373 implements MigrationInterface {
    name = 'childFix1630616195373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`parentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD CONSTRAINT \`FK_a6283aa9ded0655f8559993531f\` FOREIGN KEY (\`parentId\`) REFERENCES \`softres\`.\`recetas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP FOREIGN KEY \`FK_a6283aa9ded0655f8559993531f\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`parentId\``);
    }

}
