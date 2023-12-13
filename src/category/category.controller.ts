import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UUID } from 'crypto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<CategoryEntity[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') userId: UUID): Promise<CategoryEntity> {
    return this.categoryService.getCategoryById(userId);
  }

  @Post()
  async createCategory(@Body() createCategory: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategory);
  }
}
