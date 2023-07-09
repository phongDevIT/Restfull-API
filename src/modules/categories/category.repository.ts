/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from '../../entities/categories.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/modals/category.modal';
import { ICategoryRepository } from 'src/interfaces/ICategoryReponsitory';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoryRepository: Repository<CategoriesEntity>
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findById(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['cars'],
    });
  }

  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  async update(id: number, category: Category): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const isFlag = await this.categoryRepository.delete(id);
    return isFlag.affected === 1;
  }
}
