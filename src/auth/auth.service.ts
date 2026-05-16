import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Auth } from 'src/entities/auth.entity';
import { SignUpDto } from './dto/SignUpDto';
import { LoginDto } from './dto/LoginDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
    const existingUser = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const user = this.usersRepo.create({
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
      email: dto.email,
    });
    const savedUser = await this.usersRepo.save(user);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const auth = this.authRepo.create({
      userID: savedUser.id,
      hashedPassword,
    });
    await this.authRepo.save(auth);

    return {
      message: 'User created successfully',
      data: {
        id: savedUser.id,
        email: savedUser.email,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const auth = await this.authRepo.findOne({ where: { userID: user.id } });
    if (!auth) {
      throw new BadRequestException('Authentication not set up for this user');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, auth.hashedPassword);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id, email: user.email });
    return {
      success: true,
      message: 'Login successful',
      token,
    };
  }
}