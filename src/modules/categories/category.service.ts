/* eslint-disable prettier/prettier */

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from '../../entities/categories.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/modals/category.modal';
import { ICategoryRepository } from 'src/interfaces/ICategoryReponsitory';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async finById(id: number): Promise<Category> {
    return await this.categoryRepository.findById(id);
  }

  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.create(category);
  }
  async update(id: number, category: Category): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return this.finById(id);
  }
  async delete(id: number): Promise<boolean> {
    return await this.categoryRepository.delete(id);
  }
}
