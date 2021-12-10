import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AnimeDto } from './dto/anime.dto';
import { UpdateAnimeDto } from './dto/anime-update.dto';
import { PrismaService } from 'src/prisma.service';
import { Anime } from '@prisma/client';

@Injectable()
export class AnimeService {
  constructor(private database: PrismaService) {}
  async create(dadosAnime: AnimeDto): Promise<Anime> {
    const animeExist = await this.database.anime.findUnique({
      where: { nome: dadosAnime.nome },
    });

    if (animeExist) {
      throw new ConflictException('Anime já cadastrado!');
    }

    const anime = await this.database.anime.create({
      data: dadosAnime,
    });

    return anime;
  }

  async findaAll(): Promise<Anime[]> {
    const animes = await this.database.anime.findMany();
    return animes;
  }

  async findONe(id: string): Promise<Anime> {
    const animeExist = await this.database.anime.findUnique({
      where: { id },
    });

    if (!animeExist) {
      throw new NotFoundException('ID do anime não encontrado');
    }

    return animeExist;
  }

  async update(id: string, dadosAnime: UpdateAnimeDto): Promise<Anime> {
    const anime = await this.database.anime.update({
      data: dadosAnime,
      where: { id },
    });

    return anime;
  }

  async delete(id: string): Promise<{ message: string }> {
    const animeExist = await this.database.anime.findUnique({
      where: { id },
    });

    if (!animeExist) {
      throw new NotFoundException('ID do anime não encontrado');
    } else {
      await this.database.anime.delete({
        where: { id },
      });
    }

    return { message: 'ID encontrando e deletado' };
  }

  async watched(id: string, dadosAnime: UpdateAnimeDto): Promise<Anime> {
    const animeWatched = await this.database.anime.update({
      data: dadosAnime.assistido,
      where: { id },
    });
    return animeWatched;
  }
}
