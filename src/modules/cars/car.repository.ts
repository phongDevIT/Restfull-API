/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from 'src/entities/cars.entity';
import { BaseRepository } from 'src/interfaces/BaseRepository';
import { ICarRepository } from 'src/interfaces/ICarReponsitory';
import { Car } from 'src/modals/car.modal';

import { Repository } from 'typeorm';

@Injectable()
export class CarRepository
  extends BaseRepository<CarsEntity, Repository<CarsEntity>>
  implements ICarRepository
{
  constructor(
    @InjectRepository(CarsEntity)
    protected readonly repository: Repository<CarsEntity>
  ) {
    super(repository);
  }

  async findRelationById(id: number): Promise<Car> {
    return await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });
  }
}
