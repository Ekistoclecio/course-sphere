import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Lesson,
  LessonStatus,
} from 'src/modules/lessons/entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsTasksService {
  private readonly logger = new Logger(LessonsTasksService.name);

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async updateLessonsStatus() {
    this.logger.log('Executando atualização de status das aulas...');

    const now = new Date();
    await this.lessonRepository
      .createQueryBuilder()
      .update(Lesson)
      .set({ status: LessonStatus.PUBLISHED })
      .where('publish_date <= :now', { now })
      .andWhere('status != :published', { published: 'published' })
      .execute();

    const lessons = await this.lessonRepository.find({
      relations: ['course'],
    });

    const toArchive: Lesson[] = [];

    for (const lesson of lessons) {
      if (
        lesson.course &&
        lesson.course.end_date < now &&
        lesson.status !== LessonStatus.ARCHIVED
      ) {
        lesson.status = LessonStatus.ARCHIVED;
        toArchive.push(lesson);
      }
    }

    if (toArchive.length) {
      await this.lessonRepository.save(toArchive);
    }
    this.logger.log('Status das aulas atualizado com sucesso.');
  }
}
