import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LessonsService } from '../lessons.service';
import { CoursesService } from '../../courses/courses.service';
import { UserPayload } from 'src/modules/auth/guards/auth-token.guard';
import { Request } from 'express';
import { CreateLessonDto } from 'src/modules/lessons/dto/create-lesson.dto';

@Injectable()
export class LessonRoutesPoliciesGuard implements CanActivate {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly coursesService: CoursesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['current_user'] as UserPayload;
    const handlerName = context.getHandler().name;

    if (handlerName === 'create') {
      return this.checkCreatePolicy(request, user);
    }

    if (handlerName === 'update' || handlerName === 'remove') {
      return this.checkUpdateOrRemovePolicy(request, user);
    }

    return true;
  }

  private async checkCreatePolicy(
    request: Request,
    user: UserPayload,
  ): Promise<boolean> {
    const { course_id } = request.body as CreateLessonDto;

    const course = await this.coursesService.findOne(course_id, user);
    if (!course) {
      throw new ForbiddenException(
        'Você não tem autorização para realizar esta ação.',
      );
    }

    const isInstructor = course.instructors.some(
      (instructor) => instructor.id === user.id,
    );
    const isCourseCreator = course.creator_id === user.id;

    if (!isInstructor && !isCourseCreator) {
      throw new ForbiddenException(
        'Você não tem permissão para criar lições neste curso.',
      );
    }

    return true;
  }

  private async checkUpdateOrRemovePolicy(
    request: Request,
    user: UserPayload,
  ): Promise<boolean> {
    const lessonId = Number(request.params.id);

    const lesson = await this.lessonsService.findOne(lessonId);
    if (!lesson) {
      throw new ForbiddenException(
        'Você não tem autorização para realizar esta ação.',
      );
    }

    const course = await this.coursesService.findOne(lesson.course_id, user);
    if (!course) {
      throw new ForbiddenException(
        'Curso não encontrado ou você não tem permissão para acessar este curso.',
      );
    }

    const isLessonCreator = lesson.creator_id === user.id;
    const isCourseCreator = course.creator_id === user.id;

    if (!isLessonCreator && !isCourseCreator) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar ou remover lições neste curso.',
      );
    }

    return true;
  }
}
