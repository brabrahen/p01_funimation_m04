import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({defaultStrategy: 'jwt'})],
  providers: [AnimeService, PrismaService],
  controllers: [AnimeController]
})
export class AnimeModule {}
