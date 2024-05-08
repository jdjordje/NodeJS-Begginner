import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreateUser{
    @PrimaryGeneratedColumn(`uuid`)
    id: string;

    @Column({
        unique:true,
    })
    email:string;

    @Column()
    password:string;

    @Column(`text`,{
        array:true,
        default:[],
        nullable:true,
    })
    refreshTokens: string[];
}