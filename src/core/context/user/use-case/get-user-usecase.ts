import { Repository } from "typeorm";
import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entity/user.entity";
import { CpfVeri } from "../../../util/cpf"
import { UserCpfInputDto } from "..";
import { AccountEntity } from "../../account";
import { Account } from "aws-sdk";


@Injectable()
export class GetUserUseCase {
   constructor(@InjectRepository(UserEntity)
   private readonly userRepository: Repository<UserEntity>,

   @InjectRepository(AccountEntity)
   private readonly accountRepository: Repository<AccountEntity>,

      private cpfVeri: CpfVeri,
   ) { }

   async getUserByCpf(userCpfInputDto:UserCpfInputDto):Promise<any> {
      try {
         const isCpf: boolean = this.cpfVeri.verificar(userCpfInputDto.cpf);
         if (isCpf) {
            const user = await this.userRepository.find({ where: { cpf: userCpfInputDto.cpf } });
            if(user){return user}
            throw new Error("Not exist")
         }
         throw new Error("Invalid CPF")
      } catch (error) {
         if (error.message === "Invalid CPF ") {
            throw new NotAcceptableException(error, error.message);
         }
         throw new NotFoundException(error, error.message);
      }
   }

   async getUserAll() {
      try {
         const user = this.userRepository.find();
         return user;
      } catch (error) {
         throw error
      }
   }
}