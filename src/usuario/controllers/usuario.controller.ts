import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger/dist";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../service/usuario.service";


@ApiTags('Usuario')
@Controller('/usuarios')


export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService){}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth() /*segurança*/
    async findAll():Promise<Usuario[]>{
        return await this.usuarioService.findAll();
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)

    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return await this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth() /*segurança*/
    async update(@Body() usuario: Usuario):Promise<Usuario>{
        return await this.usuarioService.update(usuario);
    }
}