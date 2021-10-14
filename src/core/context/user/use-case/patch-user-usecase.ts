import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entity/user.entity";
import { UserInputDto } from "../dto/user-input-dto";

@Injectable()
export class PatchUserUseCase {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    ){}
    
    async patchUser(userInputDto:UserInputDto,id:number){
        userInputDto.id = id;
        return this.userRepository.save(userInputDto);
    }
}