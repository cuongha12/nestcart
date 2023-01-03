import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Product } from 'src/product/entities/product.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Product, Category]),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
