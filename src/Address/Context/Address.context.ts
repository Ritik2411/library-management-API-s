import { AuthenticationEntity } from 'src/Authentication/Context/Authentication.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Address')
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', width: 255, nullable: false })
  Area: string;

  @Column({ type: 'varchar', width: 50, nullable: false })
  city: string;

  @Column({ type: 'varchar', width: 50, nullable: false })
  state: string;

  @Column({ type: 'varchar', width: 50, nullable: false })
  country: string;

  @Column({ type: 'bigint', width: 50, nullable: false })
  pincode: number;

  @OneToOne(() => AuthenticationEntity)
  @JoinColumn()
  user: AuthenticationEntity;
}
