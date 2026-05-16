import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from 'src/entities/theme.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThemeService {
    constructor(
        @InjectRepository(Theme)
        private themeRepository: Repository<Theme>
    ) {}
    
    async create(themeData: Partial<Theme>): Promise <Theme>{
        const theme = this.themeRepository.create(themeData)
        return await this.themeRepository.save(theme)
    }

    findAll(): Promise<Theme[]> {
        return this.themeRepository.find()
    }

    findOne(id: number): Promise<Theme | null> {
        return this.themeRepository.findOneBy({ id });
    }

    async update(id: number, updateData: Partial<Theme>): Promise<Theme | null> {
        await this.themeRepository.update(id, updateData)
        return this.themeRepository.findOneBy({ id })
    }

    async remove(id: number): Promise<void> {
        await this.themeRepository.delete(id);
    }
}
