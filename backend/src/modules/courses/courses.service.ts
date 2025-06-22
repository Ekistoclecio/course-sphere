import {
  BadRequestException,
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

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDto);
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

  findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    return this.courseRepository.find({
      take: limit,
      skip: offset,
      order: {
        updated_at: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOneBy({ id });

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    return course;
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
