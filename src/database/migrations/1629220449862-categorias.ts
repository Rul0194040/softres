import { MigrationInterface, QueryRunner } from 'typeorm';

export class categorias1629220449862 implements MigrationInterface {
  name = 'categorias1629220449862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`categoria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`nombre\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_7ea7a6f310e9ea6d7c25fd8c59\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`categoriaId\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`categoriaId\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7ea7a6f310e9ea6d7c25fd8c59\` ON \`softres\`.\`categoria\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`categoria\``);
  }
}
