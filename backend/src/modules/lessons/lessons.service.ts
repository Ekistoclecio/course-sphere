import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from 'src/modules/lessons/entities/lesson.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindLessonsDto } from 'src/modules/lessons/dto/find-lesson.det';
import { UserPayload } from 'src/modules/auth/guards/auth-token.guard';
import { CoursesService } from 'src/modules/courses/courses.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    private readonly courseService: CoursesService,
  ) {}

  create(createLessonDto: CreateLessonDto, current_user: UserPayload) {
    const newLesson = {
      ...createLessonDto,
      creator_id: current_user.id,
    };
    const lesson = this.lessonRepository.create(newLesson);
    return this.lessonRepository.save(lesson);
  }

  async findAll(
    course_id: number,
    query: FindLessonsDto,
    current_user: UserPayload,
  ) {
    const { search, status, limit = 10, offset = 0 } = query;
    const course = await this.courseService.findOne(course_id, current_user);

    if (!course) {
      throw new NotFoundException(`Curso não encontrado.`);
    }

    return this.lessonRepository.find({
      where: {
        ...(search && { title: ILike(`%${search}%`) }),
        ...(status && { status }),
        course_id,
      },
      order: {
        updated_at: 'DESC',
      },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const lesson = await this.lessonRepository.findOneBy({ id });

    if (!lesson) {
      throw new NotFoundException(`Aula não encontrada.`);
    }

    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonRepository.preload({
      id,
      ...updateLessonDto,
    });

    if (!lesson) {
      throw new NotFoundException(`Aula não encontrada.`);
    }

    return this.lessonRepository.save(lesson);
  }

  async remove(id: number) {
    const lesson = await this.lessonRepository.findOneBy({ id });

    if (!lesson) {
      throw new NotFoundException(`Aula não encontrada.`);
    }

    return this.lessonRepository.remove(lesson);
  }
}
