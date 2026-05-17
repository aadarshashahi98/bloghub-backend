import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { Theme } from 'src/entities/theme.entity';

@Controller('theme')
export class ThemeController {
    constructor (private readonly themeService:ThemeService) {}

    @Post('/create')
    create(@Body() themeData: Partial<Theme>): Promise <Theme> {
        return this.themeService.create(themeData)
    }

    @Get('/getall')
    findAll(): Promise<Theme[]> {
        return this.themeService.findAll()
    }

    @Get('/get/:id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Theme | null> {
        return this.themeService.findOne(id)
    }

    @Patch('/update/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Theme>): Promise <Theme | null> {
        return this.themeService.update(id, updateData)
    }

    @Delete('/delete/:id')
    remove(@Param('id', ParseIntPipe)id: number): Promise <void> {
        return this.themeService.remove(id)
    }

}
