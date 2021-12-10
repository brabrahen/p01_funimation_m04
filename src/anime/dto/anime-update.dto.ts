import { IsString, IsNumber, IsNotEmpty, IsOptional, isBooleanObject } from 'class-validator';
import { isBooleanObject } from 'util/types';

export class UpdateAnimeDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    nome: String;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    temporadas: Number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    capa: String;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    duracao: String;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    status: String;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    descricao: String;

    @isBooleanObject(false)
    @IsOptional()
    assistido: Boolean;
}