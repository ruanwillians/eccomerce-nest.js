import { UUID } from 'crypto';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: false })
  user_id: UUID;

  @Column({ name: 'city', nullable: false })
  city: string;

  @Column({ name: 'district', nullable: false })
  district: string;

  @Column({ name: 'street', nullable: false })
  street: string;

  @Column({ name: 'cep', nullable: false })
  cep: number;

  @Column({ name: 'number', nullable: false })
  number: number;

  @Column({ name: 'complement', nullable: true })
  complement: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user?: UserEntity;

  @BeforeInsert()
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  updateTimestamp() {
    this.createdAt = new Date();
  }
}
