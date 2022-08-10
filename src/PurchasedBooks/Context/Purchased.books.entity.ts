import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Purchased Books')
export class PurchasedBooksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', width: 2, nullable: false })
  quantity: number;

  @Column({ type: 'int', width: 5, nullable: false })
  price: number;

  @Column({ type: 'varchar', width: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', width: 255, nullable: false })
  userId: string;

  @Column({ type: 'varchar', width: 255, nullable: false })
  bookId: string;
}
