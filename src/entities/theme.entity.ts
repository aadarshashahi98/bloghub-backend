import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Theme {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: boolean

    @Column({type: 'int', nullable: true})
    parentID: number | null
}