import { IsString, IsEmail, IsOptional, IsNotEmpty, Length, } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(2, 150)
    nome: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(2, 150)
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    fotoPerfil: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 150)
    apelido: string;
}