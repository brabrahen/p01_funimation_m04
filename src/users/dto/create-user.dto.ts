import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
export class UserDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 150)
    nome: String;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: String;

    @IsString()
    @Length(4, 150)
    apelido: String;

    @IsString()
    fotoPerfil: String;

    @IsString()
    @IsNotEmpty()
    @Length(8, 30)
    senha: String;

    @IsString()
    @IsNotEmpty()
    @Length(8, 30)
    cofirmaSenha: String;
}