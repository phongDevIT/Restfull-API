/* eslint-disable prettier/prettier */

import { AuthPayloadDto, AuthResponseDto } from 'src/dto/auth.dto';
import { AuthPermissionDto } from '../dto/auth.dto';

export interface IAuthRepository {
  signIn(body: AuthPayloadDto): Promise<AuthPermissionDto | boolean>;
  signUp(body: AuthPayloadDto): Promise<AuthResponseDto>;
}
