import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/createUserDTO';
import { UpdateUserDto } from './dto/updateUserDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Create new user (without password)
  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  // Get a single user by id
  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Update user info
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  // Delete user
  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
    return { message: 'User deleted successfully' };
  }
}