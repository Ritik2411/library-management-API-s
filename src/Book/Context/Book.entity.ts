import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', width: 100, unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'int', width: 3, nullable: false })
  quantity: number;

  @Column({ type: 'int', width: 1, nullable: false })
  rating: number;

  @Column({ type: 'int', width: 1, nullable: false })
  price: number;

  @Column({ type: 'varchar', width: 500, nullable: false })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
