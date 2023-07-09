/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable prettier/prettier */
import { Car } from 'src/modals/car.modal';
import { AbstractPromise } from './AbstractRepository';

export interface ICarRepository extends AbstractPromise<Car> {
  findRelationById(id: number): Promise<Car>;
}
