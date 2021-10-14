import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity('usuario')
export class UserEntity {
    @Column("integer", {
        generated: true,
        nullable: false,
        primary: true,
        name: "id"
    })
    id: number;
    @Column({ type: "varchar" })
    nome: string;
    @Column({ type: "varchar" })
    cpf: string;
    @Column({ type: "varchar" })
    email: string;
    @Column({ type: "bigint" })
    conta: number;
}

