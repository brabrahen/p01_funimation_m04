import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeDto } from './dto/anime.dto';
import { UpdateAnimeDto } from './dto/anime-update.dto';
import { Plant } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('anime')
export class AnimeController {
  constructor(private readonly database: AnimeService): Promise<Anime> {}

  @UseGuards(AuthGuard())
  @Post('create')
  create(@Body() AnimeDto: AnimeDto): Promise<Anime> {
    return this.animeService.create(AnimeDto);
  }

  @UseGuards(AuthGuard())
  @Get('get-all')
  findAll(): Promsise<Anime[]> {
    return this.animeService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('find-one/:id')
  findOne(@Param('id') id: string): Promise<Anime> {
    return this.animeService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() animeUpdate: UpdateAnimeDto,
  ): Promise<Anime> {
    return this.animeService.update(id, animeUpdate);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.animeService.delete(id);
  }

  
  @UseGuards(AuthGuard())
  @Patch('watched/:id')
  watched(
    @Param('id') id: string,
    @Body() animeUpdate: UpdateAnimeDto,
  ): Promise<Anime> {
    return this.animeService.update(id, animeUpdate);
  }
}
