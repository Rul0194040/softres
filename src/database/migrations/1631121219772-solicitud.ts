import { MigrationInterface, QueryRunner } from 'typeorm';

export class solicitud1631121219772 implements MigrationInterface {
  name = 'solicitud1631121219772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`softres\`.\`compraSolicitud\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`fecha\` date NOT NULL, \`folio\` varchar(100) NOT NULL, \`total\` decimal NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_e05f7c87956150c574ba17820e\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD \`solicitudId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_4eca7cf8b89d19a4c2762921ee9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` CHANGE \`insumoId\` \`insumoId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_4eca7cf8b89d19a4c2762921ee9\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD CONSTRAINT \`FK_66d98ddf52dbc5dd46b5695ba32\` FOREIGN KEY (\`solicitudId\`) REFERENCES \`softres\`.\`compraSolicitud\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP FOREIGN KEY \`FK_66d98ddf52dbc5dd46b5695ba32\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_4eca7cf8b89d19a4c2762921ee9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` CHANGE \`insumoId\` \`insumoId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_4eca7cf8b89d19a4c2762921ee9\` FOREIGN KEY (\`insumoId\`) REFERENCES \`softres\`.\`insumos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP COLUMN \`solicitudId\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e05f7c87956150c574ba17820e\` ON \`softres\`.\`compraSolicitud\``,
    );
    await queryRunner.query(`DROP TABLE \`softres\`.\`compraSolicitud\``);
  }
}
