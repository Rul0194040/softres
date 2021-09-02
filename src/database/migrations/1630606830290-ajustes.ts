import {MigrationInterface, QueryRunner} from "typeorm";

export class ajustes1630606830290 implements MigrationInterface {
    name = 'ajustes1630606830290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`numPorciones\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` DROP COLUMN \`costoXporcion\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`numPorciones\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`costoXporcion\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` CHANGE \`grupo\` \`grupo\` enum ('fuerte', 'complemento', 'extra', 'subreceta', 'extra/subreceta', 'complemento/subreceta') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` CHANGE \`grupo\` \`grupo\` enum ('extra', 'subreceta', 'extra/subreceta') NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`costoXporcion\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`numPorciones\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`costoXporcion\` mediumint NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetasDetalle\` ADD \`numPorciones\` mediumint NULL`);
    }

}
