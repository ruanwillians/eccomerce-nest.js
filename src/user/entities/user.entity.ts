import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: UUID;
  @Column({ name: 'name', nullable: false })
  name: string;
  @Column({ name: 'email', nullable: false })
  email: string;
  @Column({ name: 'phone', nullable: false })
  phone: string;
  @Column({ name: 'document', nullable: false })
  document: string;
  @Column({ name: 'password', nullable: false })
  password: string;
}
