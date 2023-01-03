import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Profile } from 'src/user/entities/profile.entity';
import { Product } from 'src/product/entities/product.entity';
import { Auth } from './entities/auth.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, Profile, Product, Auth]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
