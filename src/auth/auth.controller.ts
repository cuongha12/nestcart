import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto, @Req() req, @Res() res) {
    return this.authService.findAll(createAuthDto, req, res);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  @Get()
  async findOne(@Req() req, @Res() res) {
    return this.authService.findOne(req, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete()
  remove(@Req() req, @Res() res) {
    return this.authService.remove(req, res);
  }
}
