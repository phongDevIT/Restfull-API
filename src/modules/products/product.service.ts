/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { Product } from 'src/modals/product.modal';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      categoryId: 2,
      price: 80000,
      productName: 'keyboard',
    },
    {
      id: 2,
      categoryId: 2,
      price: 80000,
      productName: 'mouse',
    },
  ];
  getProducts(): Product[] {
    return this.products;
  }

  createProduct(productDto: ProductDto): Product {
    const product: Product = {
      id: Math.random(),
      ...productDto,
    };
    this.products.push(product);
    return product;
  }

  detailProduct(id: number): Product {
    return this.products.find((item) => item.id === Number(id));
  }

  updateProduct(productDto: ProductDto, id: number): Product {
    const index = this.products.findIndex((item) => item.id === Number(id));
    this.products[index].categoryId = productDto.categoryId;
    this.products[index].productName = productDto.productName;
    this.products[index].price = productDto.price;
    return productDto;
  }

  deleteProduct(id: number): boolean {
    const index = this.products.findIndex((item) => item.id === Number(id));
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}
