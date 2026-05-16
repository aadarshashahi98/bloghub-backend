import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog, BlogType } from 'src/entities/blog.entity';
import { DeepPartial, Like, Raw, Repository } from 'typeorm';
import { CreateBlogDto } from './dto/CreateBlog';
import { generateUniqueSlug } from 'src/utils/slugGenerator';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) {}
    
    async create(blogData: CreateBlogDto): Promise<Blog> {
        const slug = await generateUniqueSlug(blogData.title, async (slug: string) => {
            const count = await this.blogRepository.count({ where: { slug } });
            return count > 0;
        });

        const blogPayload: DeepPartial<Blog> = {
            ...blogData,
            slug,
        };

        const blog = this.blogRepository.create(blogPayload);
        const saved = await this.blogRepository.save(blog);
        console.log(saved);
        return saved;
    }

    findAll(): Promise<Blog[]> {
        return this.blogRepository.find()
    }

    findOne(slug: string): Promise<Blog | null> {
        return this.blogRepository.findOneBy({slug})
    }

    getByCategory(id: number): Promise<Blog[]> {
        return this.blogRepository.find({ where: {themeID: id} })
    }

    async update(id: number, updateData: Partial<Blog>): Promise<Blog | null> {
        await this.blogRepository.update(id, updateData)
        return this.blogRepository.findOneBy({id})
    }

    async remove(id: number): Promise<void> {
        await this.blogRepository.delete(id)
    }

    async search(filters: {
        keyword?: string, 
        type?: BlogType, 
        categoryID?: number,
        order?: 'az' | 'oldest' | 'newest'}): Promise<Blog[]> {
        const {keyword, type, categoryID, order} =  filters
        const query = this.blogRepository.createQueryBuilder('blog')

        if (keyword) {
            query.where(
                `LOWER(blog.title) LIKE LOWER(:kw) OR 
                LOWER(blog.author) LIKE LOWER(:kw) OR
                LOWER(blog.breifDescription) LIKE LOWER(:kw) OR
                (JSON_CONTAINS(blog.tags, :jsonKw))`,
                { kw: `%${keyword}%`, jsonKw: `"%${keyword}%"`}
            )
        }

        if (type) {
            query.andWhere('blog.type = :type', { type })
        }

        if (categoryID) {
            query.andWhere('blog.categoryID = :categoryID', { categoryID })
        }

        if (order === 'az') {
            query.orderBy('blog.title', 'ASC')
        } else if (order === 'oldest') {
            query.orderBy('blog.createdAT', 'ASC')
        } else if (order === 'newest') {
            query.orderBy('blog.createdAT', "DESC")
        }

        return query.getMany()
    }
}
