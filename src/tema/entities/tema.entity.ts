import { IsNotEmpty } from "class-validator";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_temas"})
export class Tema {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    descricao:string;

    @UpdateDateColumn()
    @ApiProperty()
    data: Date;

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem [];
}