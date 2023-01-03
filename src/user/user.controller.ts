import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Put, Req, Res } from '@nestjs/common/decorators';
import { CreateProfile } from './dto/creatProfile.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() req, @Res() res) {
    return this.userService.create(createUserDto, req, res);
  }

  @Get()
  findAll(@Req() req, @Res() res) {
    return this.userService.findAll(req, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
    @Res() res,
  ) {
    return this.userService.update(id, updateUserDto, req, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post(':id/profile')
  async createProfile(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() Profile: CreateProfile,
    @Req() req,
    @Res() res,
  ) {
    return this.userService.createProfile(id, Profile, req, res);
  }

  @Put(':id/profile')
  async updateProfile(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() Profile: CreateProfile,
    @Req() req,
    @Res() res,
  ) {
    return this.userService.updateProfile(id, Profile, req, res);
  }

  @Post(':id/product')
  async createProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() Product: CreateProductDto,
    @Req() req,
    @Res() res,
  ) {
    return this.userService.createProduct(id, Product, req, res);
  }
  @Put(':id/product')
  async updateProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() Product: CreateProductDto,
    @Req() req,
    @Res() res,
  ) {
    return this.userService.updateProduct(id, Product, req, res);
  }
}
