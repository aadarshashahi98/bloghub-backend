import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { BlogType } from "src/entities/blog.entity";

export class CreateBlogDto {
    @IsString()
    title: string

    @IsEnum(BlogType)
    type: BlogType

    @IsNumber()
    themeID: number

    @IsString()
    author: string

    @IsString()
    breifDescription: string

    @IsString()
    content: string

    @IsString()
    imageURL: string

    @IsString({ each: true })
    tags: string[]

}