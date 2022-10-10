import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_postagem'})
export class Postagem {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    titulo: string;


    @IsNotEmpty()
    @Column()
    text: string;

    @UpdateDateColumn()
    data: Date;
}