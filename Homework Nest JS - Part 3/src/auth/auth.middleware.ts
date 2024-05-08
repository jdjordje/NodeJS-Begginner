import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "src/users/users.service";



@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private userService: UsersService, private jwtService: JwtService, private configService: ConfigService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const refreshToken = req.headers[`refresh-token`];

        if(refreshToken){
            try {
                const{id} = await this.jwtService.verifyAsync(refreshToken.toString(),{
                    secret:this.configService.get(`REFRESH_TOKEN_SECRET`)
                })

                const foundUser = await this.userService.findUserById(id);

                const tokenExists = (await foundUser).refreshTokens.some(token => token === refreshToken);

                if (!tokenExists) throw new Error();

                const newAccessToken = await this.jwtService.signAsync({id: foundUser.id});

                const newRefreshtoken = await this.jwtService.signAsync({id: foundUser.id},{
                    secret: this.configService.get(`REFRESH_TOKEN_SECRET`), expiresIn: `1d`
                })

                await this.userService.deleteRefreshToken(foundUser.id, refreshToken.toString())

                await this.userService.saveRefreshToken(foundUser.id, newRefreshtoken);

                res.set(`access-token`, newAccessToken);
                res.set(`refresh-token`, newRefreshtoken)
            } catch (error) {
                console.error(error)
                
            }
        }
        next()
    }
}