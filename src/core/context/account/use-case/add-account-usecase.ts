import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "../entity/account.entity";
import { AccountInputDto } from "../dto/account-input-dto";

@Injectable()
export class AddAccountUseCase {
    constructor(@InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    ){}
    
    async addAccount(userInputDto:AccountInputDto){
        return this.accountRepository.save(userInputDto);
    }
}