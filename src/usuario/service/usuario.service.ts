import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bcrypt } from "../../auth/bcrypts/bcrypt";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ){}

    async findByUsuario(usuario:string):Promise<Usuario>{
        return await this.usuarioRepository.findOne({
            where: {
            usuario:usuario
        }
        })
    }

    async findAll():Promise<Usuario[]>{
        return await this.usuarioRepository.find({
            relations:{
                postagem: true
            }
        })
    }

    async findById(id:number):Promise<Usuario>{
        let buscaUsuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem:true
            }
        });

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado !',HttpStatus.NOT_FOUND);

        return buscaUsuario;
    }

    async create(usuario: Usuario):Promise<Usuario>{
        let buscaUsuario = await this.findByUsuario(usuario.usuario)

        if(!buscaUsuario){
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException('O usuário já existe', HttpStatus.BAD_REQUEST)
    }

    async update(usuario: Usuario): Promise<Usuario>{
        let updateUsuario: Usuario = await this.findById(usuario.id);
        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if(!updateUsuario)
            throw new HttpException('Usuário não encontrado !', HttpStatus.NOT_FOUND);

        if(buscaUsuario && buscaUsuario.id != usuario.id)
            throw new HttpException('Usuário (e-mail) já está cadastrado !', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
        return await this.usuarioRepository.save(usuario);
    }
}