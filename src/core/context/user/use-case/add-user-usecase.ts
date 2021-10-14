import { Repository } from "typeorm";
import { ConflictException, Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entity/user.entity";
import { UserInputDto } from "../dto/user-input-dto";
import { CpfVeri } from "../../../util/cpf"
import { AccountEntity, AccountInputDto } from "../../account";

@Injectable()
export class AddUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    private cpfVeri: CpfVeri) { }


  async addUser(userInputDto: UserInputDto): Promise<any> {
    try {
      const isCpf: boolean = this.cpfVeri.verificar(userInputDto.cpf);
      if (isCpf) {
        userInputDto.conta = await this.createAccount();
        let user = await this.userRepository.save(userInputDto);
        let account = {
          conta_usuario: user.conta
        };
        await this.accountRepository.save(account);

        if (!user) {
          throw new Error("User exist")
        }
        return user;
      }
      throw new Error("Invalid CPF or E-mail")
    } catch (error) {
      if (error.message === "Invalid CPF or E-mail") {
        throw new NotAcceptableException(error, error.message);
      }
      throw new ConflictException(error, error.message)
    }
  }

  async createAccount() {
    let numberAccountInt = this.randomAccountNumber()
    const accountExist = await this.userRepository.find({ where: { conta: numberAccountInt } });
    if (accountExist) {
      return numberAccountInt
    }
    return this.createAccount();
  }
  private randomAccountNumber() {
    let numberAccount = (Math.random() * 900000) + 100000
    return Math.floor(numberAccount)
  }
}