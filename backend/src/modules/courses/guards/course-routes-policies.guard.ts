import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { CoursesService } from '../courses.service'; // ajuste o path
import { Request } from 'express';
import { UserPayload } from 'src/modules/auth/guards/auth-token.guard';

@Injectable()
export class CourseRoutesPoliciesGuard implements CanActivate {
  constructor(private readonly coursesService: CoursesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request['current_user'] as UserPayload;

    const courseId = Number(request.params.id);
    if (isNaN(courseId)) {
      throw new ForbiddenException('Você não tem permissão para esta ação.');
    }

    const course = await this.coursesService.findOne(courseId);

    if (course.creator_id !== user.id) {
      throw new ForbiddenException('Você não tem permissão para esta ação.');
    }

    return true;
  }
}
