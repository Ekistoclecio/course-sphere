import { forwardRef, Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/modules/lessons/entities/lesson.entity';
import { CoursesModule } from 'src/modules/courses/courses.module';
import { LessonRoutesPoliciesGuard } from 'src/modules/lessons/guards/lessons-routes-policies.guard';
import { Course } from 'src/modules/courses/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Course]),
    forwardRef(() => CoursesModule),
  ],
  controllers: [LessonsController],
  providers: [LessonsService, LessonRoutesPoliciesGuard],
  exports: [LessonsService],
})
export class LessonsModule {}
