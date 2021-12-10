import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CrendentialsDto } from './dto/credentials.dto';
import * from 'bcrypt'


@Injectable()
export class AuthService {
    constructor(private database: PrismaService) {}

    async login(dadosLogin: CrendentialsDto) {
        const userExist = await this.database.user.findUnique({
            where: { email: dadosLogin.email}
        });

        if(!userExist) {
            throw new NotFoundException('Usuário nao encontrado')
        }

        const senhaValida = await bcrypt.compare(
            dadosLogin.senha
            userExist.senha
        )

        if(senhaValida){
            const ingresso = {
                email: userExist.email,
            };
            
            const token = await this.jwt.sign(ingresso);
            return { token }
        } else {
            throw new UnauthorizedException('credenciais invalidas');
        }
    }
}
