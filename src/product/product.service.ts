import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllProducts(): Promise<ProductEntity[]> {
    const product = await this.cacheService.getCache<ProductEntity[]>(
      `product`,
      () => this.productRepository.find(),
    );
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  async createProduct(product: CreateProductDto): Promise<ProductEntity> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }
}
