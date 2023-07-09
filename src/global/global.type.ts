/* eslint-disable prettier/prettier */
export type ResponseType<D> = {
  data?: D | D[];
  statusCode?: number;
  message?: string;
};
