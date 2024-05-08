import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Credentials } from './dto/credentials.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    async registerUser(createUserDto : CreateUserDto){
        const userExists = await this.userService.findUserByEmail(createUserDto.email);

        if(userExists) throw new BadRequestException(`Email exists!`);

        const hashedPassword = await hash(createUserDto.password);

        createUserDto.password = hashedPassword;

        await this.userService.createUser(createUserDto);
    }

    async loginUser(credentials : Credentials){
        const user = await this.userService.findUserByEmail(credentials.email);

        if(!user) throw new NotFoundException(`Invalid credentials`);

        const validPassword = compare(credentials.pasword, user.password);

        if(!validPassword) throw new UnauthorizedException('Invalid Credentials');

        const token = await this.jwtService.signAsync({id: user.id});

        const refreshToken = await this.jwtService.signAsync({id: user.id},{
            secret: this.configService.get(`REFRESH_TOKEN_SECRET`), expiresIn: `1d`,
        })
        
        await this.userService.saveRefreshToken(user.id,refreshToken);

        delete user.refreshTokens;
        delete user.password;

        return {user: user, token, refreshToken}


    }

    async logoutUser(refreshToken:string){
        try {
            const{id} = await this.jwtService.verifyAsync(refreshToken,{secret: this.configService.get(`REFRESH_TOKEN_SECRET`)})

            await this.userService.deleteRefreshToken(id,refreshToken);


        } catch (error) {
            throw new BadRequestException(`Can't logout user!`)
        }
    }

    async refreshAcessToken(refreshToken: string){
        try {
            const {id} = await this.jwtService.verifyAsync(refreshToken,{
                secret:this.configService.get(`REFRESH_TOKEN_SECRET`)}) 
            

            const foundUser = await this.userService.findUserById(id);
            
            const tokenExists = foundUser.refreshTokens.some(token=> token === refreshToken);

            if(!tokenExists) throw new Error();

            const newAccessToken = await this.jwtService.signAsync({if: foundUser.id})

            const newRefreshtoken = await this.jwtService.signAsync({id: foundUser.id},{secret: this.configService.get(`REFRESH_TOKEN_SECRET`), expiresIn: `1d`
            })
            
            await this.userService.saveRefreshToken(foundUser.id,refreshToken);

            await this.userService.deleteRefreshToken(foundUser.id,refreshToken);

            return{
                token: newAccessToken, refreshToken:newRefreshtoken
            }
        } catch (error) {
            throw new ForbiddenException()
        }
    }
}
