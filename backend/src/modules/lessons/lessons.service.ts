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

  async create(createLessonDto: CreateLessonDto, current_user: UserPayload) {
    const newLesson = {
      ...createLessonDto,
      creator_id: current_user.id,
    };
    const lesson = this.lessonRepository.create(newLesson);
    const savedLesson = await this.lessonRepository.save(lesson);
    return {
      ...savedLesson,
      can_manage: current_user.id === savedLesson.creator_id,
    };
  }

  async findAll(query: FindLessonsDto, current_user: UserPayload) {
    const { course_id, search, status, limit, offset = 0 } = query;

    const course = await this.courseRepository.findOne({
      where: { id: course_id, creator_id: current_user.id },
      relations: ['instructors'],
    });

    if (
      !course ||
      (course.creator_id !== current_user.id &&
        !course.instructors.some((i) => i.id === current_user.id))
    ) {
      throw new NotFoundException('Curso não encontrado.');
    }

    const qb = this.lessonRepository
      .createQueryBuilder('lesson')
      .where('lesson.course_id = :course_id', { course_id });

    if (search) {
      qb.andWhere('lesson.title ILIKE :search', { search: `%${search}%` });
    }

    if (status) {
      qb.andWhere('lesson.status = :status', { status });
    }

    const [results, total] = await qb
      .orderBy('lesson.updated_at', 'DESC')
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    return {
      results: results.map((lesson) => ({
        ...lesson,
        can_manage: current_user.id === lesson.creator_id,
      })),
      pagination: {
        total,
        offset,
        count: results.length,
      },
    };
  }

  async findOne(id: number, current_user: UserPayload) {
    const lesson = await this.lessonRepository.findOneBy({ id });

    if (!lesson) {
      throw new NotFoundException(`Aula não encontrada.`);
    }

    return {
      ...lesson,
      can_manage: current_user.id === lesson.creator_id,
    };
  }

  async update(
    id: number,
    updateLessonDto: UpdateLessonDto,
    current_user: UserPayload,
  ) {
    const lesson = await this.lessonRepository.preload({
      id,
      ...updateLessonDto,
    });

    if (!lesson) {
      throw new NotFoundException(`Aula não encontrada.`);
    }

    const savedLesson = await this.lessonRepository.save(lesson);
    return {
      ...savedLesson,
      can_manage: current_user.id === savedLesson.creator_id,
    };
  }

  async remove(id: number, current_user: UserPayload) {
    const lesson = await this.lessonRepository.findOneBy({ id });

    if (!lesson) {
      throw new NotFoundException(`Aula não encontrada.`);
    }

    const savedLesson = await this.lessonRepository.remove(lesson);
    return {
      ...savedLesson,
      can_manage: current_user.id === savedLesson.creator_id,
    };
  }
}
