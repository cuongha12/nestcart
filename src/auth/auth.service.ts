import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
    private jwt: JwtService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async findAll(createAuthDto: CreateAuthDto, req: Request, res: Response) {
    const { email, password } = createAuthDto;
    const checkEmail = await this.userRep.findOne({
      where: { email: email },
    });
    if (checkEmail) {
      const compare = bcrypt.compareSync(password, checkEmail.password);
      if (compare) {
        delete checkEmail.password;
        const token = await this.jwt.signAsync(
          { checkEmail },
          { secret: 'mk', expiresIn: '24h' },
        );
        res.cookie('token', token);
        return res.send({ message: 'thanh cong' });
      } else {
        return res.send({ message: 'sai mat khau' });
      }
    } else {
      return res.send(`Không tìm thấy tài khoản với email: ${email}`);
    }
  }

  async findOne(req: Request, res: Response) {
    const { token } = req.cookies;
    const checkToken = await this.jwt.verifyAsync(token, { secret: 'mk' });
    if (checkToken) {
      const checkEmail = await this.userRep.findOne({
        where: { email: checkToken.email },
      });
      delete checkEmail.password;
      return res.json(checkEmail);
    } else {
      return res.json('khong co');
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send('thanh cong');
  }
}
