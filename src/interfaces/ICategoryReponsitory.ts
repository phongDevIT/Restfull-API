/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable prettier/prettier */
import { Category } from 'src/modals/category.modal';
import { AbstractPromise } from './AbstractRepository';

export interface ICategoryRepository extends AbstractPromise<Category> {}
