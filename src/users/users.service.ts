import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private database: PrismaService) {}

  async createUser(dadosUser: UserDto): Promise<User> {
    if(dadosUser.senha != dadosUser.cofirmaSenha){
      throw new UnauthorizedException(
        'A senha e a confirmação não são compativeis',
      );
    }

    const userExist = await this.database.user.findUnique({
      where: { email: dadosUser.email },
    });

    if (userExist) {
      throw new ConflictException('Este email já está em uso!');
    }

    const saltos = 10;
    const hashSenha = await bcrypt.hash(dadosUser.senha, saltos);

    delete dadosUser.cofirmaSenha;

    const user = await this.database.user.create({
      data: {
        ...dadosUser,
        senha: hashSenha,
      },
    });
    delete user.senha;
    return user;
  }

  async update(id: string, dadosUser: UpdateUserDto): Promise<User> {
    const user = await this.database.user.update({
      data: dadosUser,
      where: { id: id },
    });

    delete user.senha;
    return user;
  }

  async findMany(): Promise<any[]> {
    const user = await this.database.user.findMany();
    const userNoPass = user.map(({ senha, ...resto }) => resto);
    return userNoPass;
  }

  async findUnique(id: string): Promise<user> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('ID de usuário não encontrada');
    }
    delete user.senha;
    return user;
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('ID de usuário não encontrada');
    } else {
      await this.database.user.delete({
        where: { id },
      });
    }
    return {
      message: 'ID deletado com sucesso',
    };
  }
}
