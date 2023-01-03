import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column()
  price: number;

  @ManyToOne(() => User, (e) => e.product)
  @JoinColumn()
  user: User;
}
