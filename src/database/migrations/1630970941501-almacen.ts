import { MigrationInterface, QueryRunner } from 'typeorm';

export class almacen1630970941501 implements MigrationInterface {
  name = 'almacen1630970941501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`capacidad\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD \`maximo\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD \`minimo\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` CHANGE \`depto\` \`depto\` enum ('COCINA', 'BARRA', 'ALMACÉN') NOT NULL DEFAULT 'COCINA'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`minimo\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP COLUMN \`maximo\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` ADD \`capacidad\` decimal(10,2) NOT NULL DEFAULT '0.00'`,
    );
  }
}
