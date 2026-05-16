import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity('Auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashedPassword: string;

  @Column()
  userID: number;

  @CreateDateColumn()
  createdAT: Date;

  @UpdateDateColumn()
  updatedAT: Date;
}