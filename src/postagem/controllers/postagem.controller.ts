import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { PostagemServicer } from "../services/postagem.service";

@Controller('/postagens')
export class  PostagemController {
    constructor (private readonly postagemServicer: PostagemServicer) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.postagemServicer.findAll ();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(
        @Param('id', ParseIntPipe)
        id: number

    ): Promise<Postagem> {
        return this.postagemServicer.findById(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(
        @Param('titulo')
        titulo: string
    ): Promise<Postagem[]> {
        return this.postagemServicer.findByIdTitulo(titulo);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@
        Body()
        Postagem: Postagem
    ): Promise<Postagem>{
        return this.postagemServicer.create(Postagem)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update (
    @Body ()
    postagem: Postagem

    ): Promise<Postagem> {
        return this.postagemServicer.update(postagem);

    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete (
        @Param('id', ParseIntPipe)
        id: number
    ) {
        return this.postagemServicer.delete(id);
    }
    
}
