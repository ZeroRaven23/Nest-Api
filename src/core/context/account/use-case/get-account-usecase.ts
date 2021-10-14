import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "../entity/account.entity";
import { AccountGetInputDto } from "../dto/account-get-input-dto.ts";
import { last } from "rxjs";
import { error } from "console";

@Injectable()
export class GetAccountUseCase {
    constructor(@InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    ) { }

    async getAccount(accountGetInputDto: AccountGetInputDto) {
        try {
            const account = await this.accountRepository.find({
                where: { conta_usuario: accountGetInputDto.conta_usuario },
                order: {
                    conta_usuario: "ASC",
                    id: "DESC"
                }, take: 1
            });
            return account
        } catch (error) {
            throw new NotFoundException(error, "User not exist")
        }
    }
}