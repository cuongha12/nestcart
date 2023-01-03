import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Product } from 'src/product/entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  profile?: Profile;

  @OneToMany(() => Product, (product) => product.user, {
    eager: true,
    cascade: true,
  })
  product?: Product[];

  @ManyToOne(() => Category, (e) => e.user, {
    eager: true,
  })
  @JoinColumn()
  category: Category;
}
