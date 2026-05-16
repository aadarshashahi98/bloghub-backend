import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Theme } from "./theme.entity";

export enum BlogType {
    BLOG = "Blog Post",
    VIDEO = "Video Blog"
}

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({type: 'enum', enum: BlogType})
    type: BlogType

    @Column()
    author: string

    @Column()
    breifDescription: string

    @Column()
    content: string

    @Column()
    imageURL: string

    @Column('json', {nullable: true})
    tags: string[]

    @ManyToOne(() => Theme, (theme) => theme.id)
    @JoinColumn({ name: 'themeID' })
    theme: Theme

    @Column()
    themeID: number

    @Column({ unique: true })
    slug: string

    @CreateDateColumn()
    createdAT: Date

    @UpdateDateColumn()
    updatedAt: Date
}