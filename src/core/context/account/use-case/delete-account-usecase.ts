import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "../entity/account.entity";

@Injectable()
export class DeleteAccountUseCase {
    constructor(@InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    ){}
    
    async deleteAccount(id:number){
    return this.accountRepository.delete(id);
    }
}