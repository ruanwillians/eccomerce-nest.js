import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1701643541561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS address (
            id UUID PRIMARY KEY,
            user_id UUID NOT NULL,
            city VARCHAR(255) NOT NULL,
            district VARCHAR(255) NOT NULL,
            street VARCHAR(255) NOT NULL,
            cep INTEGER NOT NULL,
            number INTEGER NOT NULL,
            complement VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "address";');
  }
}
