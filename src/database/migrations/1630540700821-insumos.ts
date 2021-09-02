import { MigrationInterface, QueryRunner } from 'typeorm';

export class insumos1630540700821 implements MigrationInterface {
  name = 'insumos1630540700821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` MODIFY \`precioUnitario\` decimal(10,2) NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` MODIFY \`pesoNeto\` decimal(10,2) NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` MODIFY \`pesoDrenado\` decimal(10,2) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` MODIFY \`precioKilo\` decimal(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` MODIFY \`merma\` decimal(10,2) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` MODIFY \`mermaPorcentaje\` decimal(10,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`mermaPorcentaje\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`mermaPorcentaje\` mediumint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`merma\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`merma\` mediumint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`precioKilo\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`precioKilo\` mediumint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`pesoDrenado\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`pesoDrenado\` mediumint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`pesoNeto\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`pesoNeto\` mediumint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP COLUMN \`precioUnitario\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` ADD \`precioUnitario\` mediumint NOT NULL`,
    );
  }
}
