import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateProfile } from './dto/creatProfile.dto';
import { Profile } from './entities/profile.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt/dist';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
    @InjectRepository(Profile) private readonly profileRep: Repository<Profile>,
    @InjectRepository(Product) private readonly productRep: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRep: Repository<Category>,
    private jwt: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto, req: Request, res: Response) {
    const { name, email, password } = createUserDto;
    const { token } = req.cookies;
    const checkToken = await this.jwt.verifyAsync(token, { secret: 'mk' });
    if (checkToken) {
      const checkEmail = await this.userRep.findOne({
        where: { email: checkToken.email },
      });
      delete checkEmail.password;
      if (checkEmail.role === 'admin') {
        const checkCategory = await this.categoryRep.findOneBy({
          id: createUserDto.categoryId,
        });
        const newUser = {
          name: name,
          email: email,
          password: bcrypt.hashSync(password, 10),
        };
        const updateUser = this.userRep.create({
          ...newUser,
          category: checkCategory,
        });
        await this.userRep.save(updateUser);
        delete updateUser.password;
        return res.json(updateUser);
      } else {
        return res.json('khong du quyen');
      }
    } else {
      return res.json('khong co');
    }
  }

  async findAll(req: Request, res: Response) {
    const { token } = req.cookies;
    const checkToken = await this.jwt.verifyAsync(token, { secret: 'mk' });
    const check = await this.userRep.find({
      where: { email: checkToken.email },
    });
    if (check) {
      const checkEmail = await this.userRep.find();
      const newData = checkEmail.map((e) => {
        return {
          id: e.id,
          name: e.name,
          email: e.email,
          role: e.role,
          profile: e.profile,
          product: e.product,
        };
      });
      return res.json(newData);
    } else {
      return res.json('khong co');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    req: Request,
    res: Response,
  ) {
    const findUser = await this.userRep.findOneBy({ id });
    if (findUser) {
      this.userRep.merge(findUser, updateUserDto);
      const findCategory = await this.categoryRep.findOneBy({
        id: updateUserDto.categoryId,
      });
      findUser.category = findCategory;
      return await this.userRep.save(findUser);
    }
  }
  async createProfile(
    id: number,
    createProfile: CreateProfile,
    req: Request,
    res: Response,
  ) {
    const { token } = req.cookies;
    const checkToken = await this.jwt.verifyAsync(token, { secret: 'mk' });
    if (checkToken) {
      const checkEmail = await this.userRep.findOne({
        where: { email: checkToken.checkEmail.email },
      });
      delete checkEmail.password;
      if (checkEmail.role === 'admin') {
        const newPost = this.profileRep.create({
          ...createProfile,
          user: checkEmail,
        });
        return await this.profileRep.save(newPost);
      } else {
        return res.json('khong du quyen');
      }
    } else {
      return res.json('khong co');
    }
  }
  async updateProfile(
    id: number,
    createProfile: CreateProfile,
    req: Request,
    res: Response,
  ) {
    const { token } = req.cookies;
    const checkToken = await this.jwt.verifyAsync(token, { secret: 'mk' });
    if (checkToken) {
      const checkEmail = await this.userRep.findOne({
        where: { email: checkToken.checkEmail.email },
      });
      delete checkEmail.password;
      if (checkEmail.role === 'admin') {
        const profile = await this.profileRep.findOneBy({ id });
        return await this.profileRep.update(profile.id, createProfile);
      } else {
        return res.json('khong du quyen');
      }
    } else {
      return res.json('khong co');
    }
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createProduct(
    id: number,
    createProduct: CreateProductDto,
    req: Request,
    res: Response,
  ) {
    const { token } = req.cookies;
    const checkToken = await this.jwt.verifyAsync(token, { secret: 'mk' });
    if (checkToken) {
      const checkEmail = await this.userRep.findOne({
        where: { email: checkToken.checkEmail.email },
      });
      delete checkEmail.password;
      if (checkEmail.role === 'admin') {
        const productCheck = await this.productRep.findOne({
          where: {
            name: createProduct.name,
            color: createProduct.color,
            size: createProduct.size,
          },
        });
        if (productCheck) {
          createProduct.quantity += productCheck.quantity;
          createProduct.price += productCheck.price;
          return await this.productRep.update(productCheck.id, createProduct);
        } else {
          const newProduct = this.productRep.create({
            ...createProduct,
            user: checkEmail,
          });
          return await this.productRep.save(newProduct);
        }
      } else {
        return res.json('khong du quyen');
      }
    } else {
      return res.json('khong co');
    }
  }
  async updateProduct(
    id: number,
    createProduct: CreateProductDto,
    req: Request,
    res: Response,
  ) {
    const { token } = req.cookies;
    const checkToken = await this.jwt.verifyAsync(token, { secret: 'mk' });
    if (checkToken) {
      const checkEmail = await this.userRep.findOne({
        where: { email: checkToken.checkEmail.email },
      });
      delete checkEmail.password;
      if (checkEmail.role === 'admin') {
        const product = await this.productRep.findOneBy({ id });
        if (product) {
          createProduct.quantity += product.quantity;
          createProduct.price += product.price;
          return await this.productRep.update(product.id, createProduct);
        }
      } else {
        return res.json('khong du quyen');
      }
    } else {
      return res.json('khong co');
    }
  }
}
