import { MigrationInterface, QueryRunner } from 'typeorm';

export class detSolicitud1632952466666 implements MigrationInterface {
  name = 'detSolicitud1632952466666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitudDetalle\` CHANGE \`status\` \`abastecido\` int NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitudDetalle\` DROP COLUMN \`abastecido\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitudDetalle\` ADD \`abastecido\` tinyint NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitudDetalle\` DROP COLUMN \`abastecido\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitudDetalle\` ADD \`abastecido\` int NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`solicitudDetalle\` CHANGE \`abastecido\` \`status\` int NULL DEFAULT '1'`,
    );
  }
}
