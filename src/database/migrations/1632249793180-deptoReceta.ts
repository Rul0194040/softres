import { MigrationInterface, QueryRunner } from 'typeorm';

export class deptoReceta1632249793180 implements MigrationInterface {
  name = 'deptoReceta1632249793180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` ADD \`depto\` enum ('COCINA', 'BARRA', 'ALMACÉN') NOT NULL DEFAULT 'COCINA'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`depto\``,
    );
  }
}
