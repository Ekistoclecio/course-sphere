import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/modules/courses/entities/course.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateInstructorsDto } from 'src/modules/courses/dto/update-instructors';
import { User } from 'src/modules/users/entities/user.entity';
import { UserPayload } from 'src/modules/auth/guards/auth-token.guard';
import { LessonsService } from 'src/modules/lessons/lessons.service';
import { FindLessonsDto } from 'src/modules/lessons/dto/find-lesson.det';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => LessonsService))
    private readonly lessonsService: LessonsService,
  ) {}

  create(createCourseDto: CreateCourseDto, current_user: UserPayload) {
    const newCourse = {
      ...createCourseDto,
      creator_id: current_user.id,
    };
    const course = this.courseRepository.create(newCourse);
    return this.courseRepository.save(course);
  }

  async addInstructors(id: number, body: UpdateInstructorsDto) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['instructors'],
    });

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    const existingInstructorIds = course.instructors.map((i) => i.id);

    const newInstructorIds = body.instructors_ids.filter(
      (id) => !existingInstructorIds.includes(id),
    );

    if (newInstructorIds.length === 0) {
      return course;
    }

    const newInstructors = await this.userRepository.findBy({
      id: In(newInstructorIds),
    });

    if (newInstructors.length !== newInstructorIds.length) {
      throw new BadRequestException(
        'Um ou mais instrutores não foram encontrados.',
      );
    }

    course.instructors = [...course.instructors, ...newInstructors];

    return this.courseRepository.save(course);
  }

  async removeInstructors(id: number, body: UpdateInstructorsDto) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['instructors'],
    });

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    course.instructors = course.instructors.filter(
      (instructor) => !body.instructors_ids.includes(instructor.id),
    );

    return this.courseRepository.save(course);
  }

  async findAll(pagination: PaginationDto, current_user: UserPayload) {
    const { limit, offset = 0 } = pagination;
    const [results, total] = await this.courseRepository
      .createQueryBuilder('course')
      .addSelect(['course.updated_at'])
      .leftJoinAndSelect('course.instructors', 'instructor')
      .where('course.creator_id = :userId OR instructor.id = :userId', {
        userId: current_user.id,
      })
      .orderBy('course.updated_at', 'DESC')
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    return {
      results,
      pagination: {
        total,
        offset,
        count: results.length,
      },
    };
  }

  async findOne(id: number, current_user: UserPayload) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['instructors'],
    });

    const lessons = await this.lessonsService.findAll(
      { course_id: id } as FindLessonsDto,
      current_user,
    );

    if (
      !course ||
      (course.creator_id !== current_user.id &&
        !course.instructors.some(
          (instructor) => instructor.id === current_user.id,
        ))
    ) {
      throw new NotFoundException('Curso não encontrado.');
    }

    return { ...course, lessons };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
    });

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOneBy({ id });

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    return this.courseRepository.remove(course);
  }
}
