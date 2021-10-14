import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "../entity/account.entity";
import { AccountInputDto } from "../dto/account-input-dto";
import { UserCpfInputDto } from "../../user/dto/user-cpf-input-dto";
import { CpfVeri } from "src/core/util/cpf";
import { UserEntity } from "../../user";
import { NotFoundError } from "rxjs";


@Injectable()
export class PatchAccountUseCase {
   constructor(
      @InjectRepository(UserEntity)
      private readonly userRepository: Repository<UserEntity>,

      @InjectRepository(AccountEntity)
      private readonly accountRepository: Repository<AccountEntity>,
   ) { }

   async patchAccount(accountInputDto: AccountInputDto): Promise<any> {
      try {
         const account = await this.accountRepository.find({
            select: ["conta_usuario"],
            where: { conta_usuario: accountInputDto.conta_usuario }
         })
         if (account) {
            const accountUpdate = this.accountRepository.save(accountInputDto)
            return accountUpdate
         }
         throw new Error("User not exist")
      } catch (error) {
         throw new NotFoundException(error, error.message)
      }
   }
}