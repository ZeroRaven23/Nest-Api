import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('conta')
export class AccountEntity{

    @PrimaryColumn({ type: "bigint" }) 
    id: number;

    @Column({ type: "double" })
    saldo: number;

    @Column({ type: "bigint" })
    conta_usuario:number;
}
