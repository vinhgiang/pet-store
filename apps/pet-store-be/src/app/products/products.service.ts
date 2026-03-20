import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {

  constructor(private prismaService: PrismaService) {}

  create(createProductInput: CreateProductInput) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: string) {
    return this.prismaService.product.findFirst({
      where: {
        id
      }
    });
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async searchProducts(term: string): Promise<Product[]> {
    const lowerTerm = term.toLowerCase();
    return this.prismaService.product.findMany({
      where: {
        OR: [
          { name: { contains: lowerTerm, mode: 'insensitive' } },
          { description: { contains: lowerTerm, mode: 'insensitive' } }
        ],
      },
    });
  }
}
