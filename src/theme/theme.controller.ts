import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { Theme } from 'src/entities/theme.entity';

@Controller('theme')
export class ThemeController {
    constructor (private readonly themeService:ThemeService) {}

    @Post()
    create(@Body() themeData: Partial<Theme>): Promise <Theme> {
        return this.themeService.create(themeData)
    }

    @Get()
    findAll(): Promise<Theme[]> {
        return this.themeService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Theme | null> {
        return this.themeService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Theme>): Promise <Theme | null> {
        return this.themeService.update(id, updateData)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number): Promise <void> {
        return this.themeService.remove(id)
    }

}
