import { IsString, IsNumber, IsNotEmpty, isBooleanObject } from 'class-validator';

export class AnimeDto {
    @IsString()
    @IsNotEmpty()
    nome: String;

    @IsNotEmpty()
    @IsNumber()
    temporadas: Number;

    @IsString()
    @IsNotEmpty()
    genero: String;

    @IsString()
    @IsNotEmpty()
    capa: String;

    @IsString()
    @IsNotEmpty()
    duracao: String;

    @IsString()
    @IsNotEmpty()
    status: String;

    @IsString()
    @IsNotEmpty()
    descricao: String;

    @isBooleanObject(false)
    assistido: Boolean;
}