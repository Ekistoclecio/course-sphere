import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from 'src/modules/lessons/entities/lesson.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindLessonsDto } from 'src/modules/lessons/dto/find-lesson.det';
import { UserPayload } from 'src/modules/auth/guards/auth-token.guard';
import { Course } from 'src/modules/courses/entities/course.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
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
    const { search, status, limit, offset = 0 } = query;
    const course = await this.courseRepository.findOne({
      where: { id: course_id },
      relations: ['instructors'],
    });

    if (
      !course ||
      (course.creator_id !== current_user.id &&
        !course.instructors.some((i) => i.id === current_user.id))
    ) {
      throw new NotFoundException('Curso não encontrado.');
    }

    if (!course) {
      throw new NotFoundException(`Curso não encontrado.`);
    }

    const qb = this.lessonRepository
      .createQueryBuilder('lesson')
      .where('lesson.course_id = :course_id', { course_id })
      .orderBy('lesson.updated_at', 'DESC')
      .take(limit)
      .skip(offset);

    if (search) {
      qb.andWhere('lesson.title ILIKE :search', { search: `%${search}%` });
    }

    if (status) {
      qb.andWhere('lesson.status = :status', { status });
    }

    return qb.getMany();
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
