import {MigrationInterface, QueryRunner} from "typeorm";

export class menus1631118131882 implements MigrationInterface {
    name = 'menus1631118131882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`softres\`.\`secciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, \`menuId\` int NULL, UNIQUE INDEX \`IDX_e67bd8ef94c717102a93f58f4d\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`softres\`.\`menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_69aca9e46979f8eff3286c739c\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`descripcion\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD \`seccionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` ADD CONSTRAINT \`FK_6fadd691458b08709415b7e58d0\` FOREIGN KEY (\`seccionId\`) REFERENCES \`softres\`.\`secciones\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`secciones\` ADD CONSTRAINT \`FK_58ed97360f830135991d063864b\` FOREIGN KEY (\`menuId\`) REFERENCES \`softres\`.\`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`softres\`.\`secciones\` DROP FOREIGN KEY \`FK_58ed97360f830135991d063864b\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP FOREIGN KEY \`FK_6fadd691458b08709415b7e58d0\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`seccionId\``);
        await queryRunner.query(`ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`descripcion\``);
        await queryRunner.query(`DROP INDEX \`IDX_69aca9e46979f8eff3286c739c\` ON \`softres\`.\`menus\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_e67bd8ef94c717102a93f58f4d\` ON \`softres\`.\`secciones\``);
        await queryRunner.query(`DROP TABLE \`softres\`.\`secciones\``);
    }

}
