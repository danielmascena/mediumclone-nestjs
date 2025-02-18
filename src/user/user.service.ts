import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './types/user.interface';
import { LoginDTO } from './dto/login.dto';
import {compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (userByUsername || userByEmail) {
      throw new HttpException(
        'Email or username are taken.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    console.log('newUser entity', newUser);
    return await this.userRepository.save(newUser);
  }

  async doLogin(loginDTO: LoginDTO): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: loginDTO.email },
    });
    const isValidPassword = await compare(loginDTO.password, userByEmail.password);
    if (!isValidPassword) {
      throw new HttpException(
        'invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }
    return userByEmail;
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({where: {id}})
  }

  generateJWT(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }
}
