import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from 'src/modules/lessons/entities/lesson.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindLessonsDto } from 'src/modules/lessons/dto/find-lesson.det';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  create(createLessonDto: CreateLessonDto) {
    const lesson = this.lessonRepository.create(createLessonDto);
    return this.lessonRepository.save(lesson);
  }

  findAll(query: FindLessonsDto) {
    const { search, status, course_id, limit = 10, offset = 0 } = query;
    return this.lessonRepository.find({
      where: {
        ...(search && { title: ILike(`%${search}%`) }),
        ...(status && { status }),
        ...(course_id && { course_id }),
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
