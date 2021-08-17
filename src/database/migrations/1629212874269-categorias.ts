import {MigrationInterface, QueryRunner} from "typeorm";

export class categorias1629212874269 implements MigrationInterface {
    name = 'categorias1629212874269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`softres\`.\`categoria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_7ea7a6f310e9ea6d7c25fd8c59\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`insumos_categories\` (\`insumo\` int NOT NULL, \`categoria\` int NOT NULL, INDEX \`IDX_792aa55afe66e4dfe8156af867\` (\`insumo\`), INDEX \`IDX_b14f1b2a69bb9e88d1240a2cda\` (\`categoria\`), PRIMARY KEY (\`insumo\`, \`categoria\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` ADD CONSTRAINT \`FK_792aa55afe66e4dfe8156af867a\` FOREIGN KEY (\`insumo\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` ADD CONSTRAINT \`FK_b14f1b2a69bb9e88d1240a2cda7\` FOREIGN KEY (\`categoria\`) REFERENCES \`softres\`.\`categoria\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` DROP FOREIGN KEY \`FK_b14f1b2a69bb9e88d1240a2cda7\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`insumos_categories\` DROP FOREIGN KEY \`FK_792aa55afe66e4dfe8156af867a\``);
        await queryRunner.query(`DROP INDEX \`IDX_b14f1b2a69bb9e88d1240a2cda\` ON \`softres\`.\`insumos_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_792aa55afe66e4dfe8156af867\` ON \`softres\`.\`insumos_categories\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`insumos_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ea7a6f310e9ea6d7c25fd8c59\` ON \`softres\`.\`categoria\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`categoria\``);
    }

}
