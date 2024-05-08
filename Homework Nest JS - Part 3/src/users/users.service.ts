import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUser } from "./entities/create-users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(CreateUser) private usersRepo: Repository<CreateUser>) {}

    async findUserById(id:string){
        try {
            const foundUser = await this.usersRepo.findOneByOrFail({id})
            
            return foundUser;
        } catch (error) {
            throw new NotFoundException(`User not found!`)
        }
    }

    findUserByEmail(email: string){
        return this.usersRepo.findOneBy({email})
    }

    createUser(userData: CreateUserDto){
        return this.usersRepo.save(userData)
    }

    async saveRefreshToken(userId: string, refreshtoken: string){
        const foundUser = await this.findUserById(userId);

        foundUser.refreshTokens.push(refreshtoken);

        await this.usersRepo.save(foundUser)
    }

    async deleteRefreshToken(userId: string,refreshToken:string){
        const foundUser = await this.findUserById(userId);

        foundUser.refreshTokens = foundUser.refreshTokens.filter(token => token !== refreshToken)

        await this.usersRepo.save(foundUser)
    }

}
