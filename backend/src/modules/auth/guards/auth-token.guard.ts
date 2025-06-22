import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/modules/auth/config/jwt.config';

export interface UserPayload {
  id: number;
  email: string;
  name: string;
}

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers?.authorization;

    if (!authorization || typeof authorization !== 'string') {
      return undefined;
    }

    return authorization.split(' ')[1];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Usuário não esta logado no momento.');
    }

    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(
        token,
        this.jwtConfiguration,
      );

      request['current_user'] = payload;
    } catch {
      throw new UnauthorizedException('Usuário não autorizado.');
    }

    return true;
  }
}
