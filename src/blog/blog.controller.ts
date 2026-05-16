import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog, BlogType } from 'src/entities/blog.entity';
import { CreateBlogDto } from './dto/CreateBlog';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Post()
    create(@Body() blogData: CreateBlogDto): Promise<Blog> {
        return this.blogService.create(blogData)
    }

    @Get()
    findAll(): Promise<Blog[]> {
        return this.blogService.findAll()
    }

    @Get('slug/:slug')
    findOne(@Param('slug') slug: string): Promise<Blog | null> {
        return this.blogService.findOne(slug)
    }

    @Get('category/:id')
    findByCategory(@Param('id', ParseIntPipe) id: number): Promise<Blog[]> {
        return this.blogService.getByCategory(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Blog>): Promise<Blog | null> {
        return this.blogService.update(id, updateData)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.blogService.remove(id)
    }

    @Post('search')
    search(@Body() filters: {
        keyword?: string,
        type?: BlogType,
        categoryID?: number,
        order?: 'az' | 'oldest' | 'newest'}): Promise<Blog[]> {
        return this.blogService.search(filters)
    }
}
