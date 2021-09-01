import { MigrationInterface, QueryRunner } from 'typeorm';

export class subcat1630503976252 implements MigrationInterface {
  name = 'subcat1630503976252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`categorias\` ADD \`parentCatId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`subCategoriaId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` CHANGE \`capacidad\` \`capacidad\` decimal(10,2) NOT NULL DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`categorias\` ADD CONSTRAINT \`FK_17629404357ca8b22b27a3c3692\` FOREIGN KEY (\`parentCatId\`) REFERENCES \`softres\`.\`categorias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD CONSTRAINT \`FK_cf78f903e02e388f5e8508643f2\` FOREIGN KEY (\`subCategoriaId\`) REFERENCES \`softres\`.\`categorias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_cf78f903e02e388f5e8508643f2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`categorias\` DROP FOREIGN KEY \`FK_17629404357ca8b22b27a3c3692\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` CHANGE \`capacidad\` \`capacidad\` decimal(10,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`subCategoriaId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`categorias\` DROP COLUMN \`parentCatId\``,
    );
  }
}
