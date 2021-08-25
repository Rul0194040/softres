import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixees1629831265235 implements MigrationInterface {
  name = 'fixees1629831265235';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_c85f240d18929e2bcf14dba4f2\` ON \`softres\`.\`almacen\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('Lt', 'pza', 'kg', 'ml', 'gr') NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` CHANGE \`medida\` \`medida\` enum ('Lt', 'pza', 'kg', 'ml', 'gr') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_c85f240d18929e2bcf14dba4f2\` ON \`softres\`.\`almacen\` (\`insumoId\`)`,
    );
  }
}
