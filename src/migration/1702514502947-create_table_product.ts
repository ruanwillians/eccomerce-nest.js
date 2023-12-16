import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProduct1702514502947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS product (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name UUID NOT NULL,
            categoryid UUID NOT NULL,
            price INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            description VARCHAR(255) NOT NULL,
            promotion Boolean NOT NULL,
            image VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updatedAt TIMESTAMP ,
            CONSTRAINT fk_user FOREIGN KEY (categoryid) REFERENCES "category" (id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "product";');
  }
}
