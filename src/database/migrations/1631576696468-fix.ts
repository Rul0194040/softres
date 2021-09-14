import { MigrationInterface, QueryRunner } from 'typeorm';

export class fix1631576696468 implements MigrationInterface {
  name = 'fix1631576696468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` ADD \`existencia\` decimal NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`existencia\``,
    );
  }
}
