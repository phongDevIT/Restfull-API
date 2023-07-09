/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Res,
  Param,
  Post,
  Body,
  Put,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseType } from 'src/global/global.type';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Category } from 'src/modals/category.modal';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async list(@Res() res: Response): Promise<ResponseType<Category>> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.findAll(),
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS
        )
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
      );
    }
  }

  @Get('/:id')
  async detail(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<ResponseType<Category>> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.finById(id),
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS
        )
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
      );
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) category: CategoryDto,
    @Res() res: Response
  ): Promise<ResponseType<Category>> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.create(category),
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS
        )
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
      );
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) category: CategoryDto,
    @Res() res: Response
  ): Promise<ResponseType<Category>> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.update(id, category),
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS
        )
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
      );
    }
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<ResponseType<boolean>> {
    try {
      const isFlag: boolean = await this.categoryService.delete(id);
      if (isFlag === true) {
        return res.json(
          new ResponseData(isFlag, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        );
      } else {
        return res.json(
          new ResponseData(isFlag, HttpStatus.ERROR, HttpMessage.ERROR)
        );
      }
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
      );
    }
  }
}
