/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsEntity } from 'src/entities/accounts.entity';
import { IAuthRepository } from 'src/interfaces/IAuth.Repository';
import { Repository } from 'typeorm';
import {
  AuthPayloadDto,
  AuthPermissionDto,
  AuthResponseDto,
} from '../../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/global/globalEnum';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(AccountsEntity)
    protected readonly repository: Repository<AccountsEntity>,
    private jwtService: JwtService
  ) {}

  async signIn(auth: AuthPayloadDto): Promise<AuthPermissionDto | boolean> {
    const { username, password } = auth;
    const userAuth = await this.repository.findOne({ where: { username } });
    if (!userAuth) return false;

    const isMatch = await bcrypt.compare(password, userAuth.password);
    if (!isMatch) return false;
    const payload = { ...new AuthResponseDto(userAuth) };
    return new AuthPermissionDto({
      id: userAuth.id,
      token: await this.jwtService.signAsync(payload),
      expiredTime: 900000,
    });
  }

  async signUp(auth: AuthPayloadDto): Promise<AuthResponseDto> {
    const { username, password } = auth;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return this.repository.save({
      username,
      password: hash,
      permission: 'ROLE_ADMIN',
    });
  }
}
