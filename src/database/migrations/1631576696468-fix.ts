import { MigrationInterface, QueryRunner } from 'typeorm';

export class fix1631576696468 implements MigrationInterface {
  name = 'fix1631576696468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` ADD \`existencia\` decimal NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compraSolicitud\` ADD \`status\` enum ('Borrador', 'Enviado', 'Aceptado', 'Rechazado', 'Finalizado') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` DROP FOREIGN KEY \`FK_414bcbe311a2714adc91e2ff111\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` CHANGE \`compraId\` \`compraId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` DROP FOREIGN KEY \`FK_66d98ddf52dbc5dd46b5695ba32\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` CHANGE \`solicitudId\` \`solicitudId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`comprasDetalle\` ADD CONSTRAINT \`FK_414bcbe311a2714adc91e2ff111\` FOREIGN KEY (\`compraId\`) REFERENCES \`softres\`.\`compras\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compras\` ADD CONSTRAINT \`FK_66d98ddf52dbc5dd46b5695ba32\` FOREIGN KEY (\`solicitudId\`) REFERENCES \`softres\`.\`compraSolicitud\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`recetas\` DROP COLUMN \`existencia\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`softres\`.\`compraSolicitud\` DROP COLUMN \`status\``,
    );
  }
}
