import {
  Body,
  Controller,
  Get,
  Req,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/user.interface';
import { LoginDTO } from './dto/login.dto';
import { Request } from 'express';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { User } from './decorators/user.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async doLogin(
    @Body('user') loginDTO: LoginDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.doLogin(loginDTO);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(@User() user: any): Promise<UserResponseInterface> {
    console.log('current user', user);
    return this.userService.buildUserResponse(user);
  }
}
