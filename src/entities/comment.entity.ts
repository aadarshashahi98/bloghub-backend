import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";

@Entity('Comment')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    comment_text: string

    @Column()
    createdAT: Date

    @Column()
    updatedAT: Date

    @ManyToOne(() => Blog, (blog) => blog.id)
    @JoinColumn({ name: 'blogID' })
    blog: Blog

    @Column()
    blogID: number
}