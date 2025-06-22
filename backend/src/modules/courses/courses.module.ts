import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from 'src/modules/courses/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UsersModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
