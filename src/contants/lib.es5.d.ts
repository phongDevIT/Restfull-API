// lib.es5.d.ts
/* eslint-disable prettier/prettier */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
