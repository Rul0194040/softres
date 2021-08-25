import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixAlmacen1629848192766 implements MigrationInterface {
  name = 'fixAlmacen1629848192766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `RENAME TABLE \`softres\`.\`categoria\` TO \`softres\`.\`categorias\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` CHANGE \`precioVenta\` \`costoVenta\` mediumint`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP \`fecha\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen\` DROP FOREIGN KEY \`FK_c85f240d18929e2bcf14dba4f2e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`insumos\` DROP FOREIGN KEY \`FK_1acafbf46b10a4650b5935ee728\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`almacen-Detalle\` DROP FOREIGN KEY \`FK_d58da4be866de5215426c3a5052\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3ed9f17ae386011d90a743b9cd\` ON \`softres\`.\`ventas\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`ventas\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`softres\`.\`users\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b9833b86d242aff7a6c1c33d73\` ON \`softres\`.\`compras\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`compras\``);
    await queryRunner.query(
      `DROP INDEX \`REL_c85f240d18929e2bcf14dba4f2\` ON \`softres\`.\`almacen\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f5261de086b3c1e396804ff07a\` ON \`softres\`.\`almacen\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`almacen\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8660e0a51b002f2afa8fed1e76\` ON \`softres\`.\`insumos\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_47c2e83bcc01b5610a4a35e600\` ON \`softres\`.\`insumos\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0d28ae68a8f742beb176aa51ae\` ON \`softres\`.\`insumos\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`insumos\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e3619e505b1c0ee392a6034466\` ON \`softres\`.\`categorias\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`categorias\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_f3acde8d3de672ea294189521c\` ON \`softres\`.\`almacen-Detalle\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`almacen-Detalle\``);
  }
}
