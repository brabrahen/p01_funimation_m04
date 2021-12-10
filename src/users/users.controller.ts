import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private: UsersService) {}

  @Post('create')
  create(@Body() data: UserDto): Promise<User> {
    return this.service.create(data);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.service.update(id, data);
  }

  @Get('findMany')
  findMany(): Promise<any[]> {
    return this.service.findMany();
  }

  @Get('findUnique/:id')
  findUnique(@Param('id') id: string): Promise<User> {
    return this.service.findUnique(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
