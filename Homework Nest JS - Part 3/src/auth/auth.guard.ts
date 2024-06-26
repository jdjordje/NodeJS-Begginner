import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean>{
      try {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        const { id } = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          });
    
          await this.userService.findUserById(id);
    
          return true;
      } catch (error) {
        console.log(error);
      return false;
      }
  }

  private extractToken(request: Request) {
    const token = request.headers['authorization']?.split(' ')[1];

    return token;
  }
}
