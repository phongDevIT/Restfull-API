/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthPayloadDto, AuthResponseDto } from 'src/dto/auth.dto';
import { Response } from 'express';
import { ResponseType } from '../../global/global.type';
import { AuthPermissionDto } from '../../dto/auth.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AuthService } from './auth.service';
import { Public } from 'src/contants/decorator';
import { ServerMessage, ServerStatus } from 'src/contants/enum';

@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post('/signin')
  @Public()
  async signIn(
    @Body() auth: AuthPayloadDto,
    @Res() res: Response
  ): Promise<ResponseType<AuthPermissionDto | boolean>> {
    // try {
    const isAuth = await this.authService.signIn(auth);
    if (!isAuth) {
      return res.json(
        new ResponseData(isAuth, ServerStatus.ERROR, ServerMessage.ERROR)
      );
    }
    return res.json(
      new ResponseData(isAuth, ServerStatus.OK, ServerMessage.OK)
    );
    // } catch (error) {
    //   return res.json(new ResponseData(null, ServerStatus.ERROR, ServerMessage.ERROR));
    // }
  }

  @Post('/signup')
  @Public()
  async signUp(
    @Body() auth: AuthPayloadDto,
    @Res() res: Response
  ): Promise<ResponseType<AuthResponseDto | boolean>> {
    try {
      const isAuth = await this.authService.signUp(auth);
      if (!isAuth) {
        return res.json(
          new ResponseData(isAuth, ServerStatus.ERROR, ServerMessage.ERROR)
        );
      }
      return res.json(
        new ResponseData(isAuth, ServerStatus.OK, ServerMessage.OK)
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, ServerStatus.ERROR, ServerMessage.ERROR)
      );
    }
  }
}
