/* eslint-disable prettier/prettier */

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CarsEntity } from 'src/entities/cars.entity';
// import { Car } from 'src/modals/car.modal';
// import { Repository } from 'typeorm';

// @Injectable()
// export class CarService {
//   constructor(
//     @InjectRepository(CarsEntity)
//     private carRepository: Repository<CarsEntity>
//   ) {}

//   async findAll(): Promise<Car[]> {
//     return await this.carRepository.find();
//   }

//   async findById(id: number): Promise<Car> {
//     return await this.carRepository.findOne({ where: { id } });
//   }

//   async create(car: Car): Promise<Car> {
//     return await this.carRepository.save(car);
//   }

//   async update(id: number, car: Car): Promise<Car> {
//     await this.carRepository.update(id, car);
//     return this.findById(id);
//   }

//   async delete(id: number): Promise<boolean> {
//     const deleteResult = await this.carRepository.delete(id);
//     return deleteResult.affected > 0;
//   }
// }
import { Inject, Injectable } from '@nestjs/common';
import { ICarRepository } from 'src/interfaces/ICarReponsitory';
import { Car } from 'src/modals/car.modal';

@Injectable()
export class CarService {
  constructor(
    @Inject('ICarRepository')
    private readonly carRepository: ICarRepository
  ) {}

  async findAll(): Promise<Car[]> {
    return await this.carRepository.findAll();
  }

  async findById(id: number): Promise<Car> {
    return await this.carRepository.findById(id);
  }

  async create(category: Car): Promise<Car> {
    return await this.carRepository.create(category);
  }

  async update(id: number, category: Car): Promise<Car> {
    await this.carRepository.update(id, category);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    return await this.carRepository.delete(id);
  }

  async findRelationById(id: number): Promise<Car> {
    return await this.carRepository.findRelationById(id);
  }
}
