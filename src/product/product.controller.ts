import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<ProductEntity[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  @UseGuards(AuthGuard)
  async createProduct(@Body() product: CreateProductDto) {
    return this.productService.createProduct(product);
  }
}
