/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import {
  AuthPayloadDto,
  AuthPermissionDto,
  AuthResponseDto,
} from '../../dto/auth.dto';
import { IAuthRepository } from 'src/interfaces/IAuth.Repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IAuthRepository')
    protected readonly authRepository: IAuthRepository
  ) {}

  async signIn(auth: AuthPayloadDto): Promise<AuthPermissionDto | boolean> {
    const { username, password } = auth;
    if (!username || !password) return false;

    const isAuth = await this.authRepository.signIn(auth);
    if (!isAuth) return false;
    return isAuth;
  }

  async signUp(auth: AuthPayloadDto): Promise<AuthResponseDto | boolean> {
    const { username, password } = auth;
    if (!username || !password) return false;

    const userDto: AuthResponseDto = new AuthResponseDto(
      await this.authRepository.signUp(auth)
    );
    return userDto;
  }
}
