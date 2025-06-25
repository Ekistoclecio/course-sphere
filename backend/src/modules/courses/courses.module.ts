import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from 'src/modules/courses/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/modules/users/users.module';
import { CourseRoutesPoliciesGuard } from 'src/modules/courses/guards/course-routes-policies.guard';
import { LessonsModule } from 'src/modules/lessons/lessons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    UsersModule,
    forwardRef(() => LessonsModule),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, CourseRoutesPoliciesGuard],
  exports: [CoursesService],
})
export class CoursesModule {}
