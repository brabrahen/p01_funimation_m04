import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersController, PrismaService],
  providers: [UsersService]
})
export class UsersModule {}
