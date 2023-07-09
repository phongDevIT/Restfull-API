/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength } from 'class-validator';

export class CategoryDto {
  @MinLength(5)
  categoryName: string;

  @IsNotEmpty()
  description: string;
}
