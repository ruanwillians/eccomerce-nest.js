import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CacheService } from 'src/cache/cache.service';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UUID } from 'crypto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.cacheService.getCache<CategoryEntity[]>(
      `categories`,
      () => this.categoryRepository.find(),
    );
    if (!categories) {
      throw new NotFoundException('Categories not found');
    }
    return categories;
  }

  async getCategoryById(categoryId: UUID): Promise<CategoryEntity> {
    const category = await this.cacheService.getCache<CategoryEntity>(
      `category_${categoryId}`,
      () =>
        this.categoryRepository.findOne({
          where: {
            id: categoryId,
          },
        }),
    );

    if (!category) {
      throw new NotFoundException('category not found');
    }

    return category;
  }

  async createCategory(
    createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryRepository.save(createCategory);
  }
}
