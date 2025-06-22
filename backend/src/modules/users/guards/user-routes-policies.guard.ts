import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from 'src/modules/auth/guards/auth-token.guard';

@Injectable()
export class UserRoutesPoliciesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const userID = request.params.id;
    const user = request['current_user'] as UserPayload;

    if (!user || user.id !== Number(userID)) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso.',
      );
    }

    return true;
  }
}
