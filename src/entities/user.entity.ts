import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm'

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column({ nullable: true })
  middleName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @CreateDateColumn()
  createdAT: Date

  @UpdateDateColumn()
  updatedAT: Date
}