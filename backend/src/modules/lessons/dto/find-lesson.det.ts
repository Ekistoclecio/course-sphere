import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LessonStatus } from 'src/modules/lessons/entities/lesson.entity';

export class FindLessonsDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'O campo de busca deve ser um texto válido.' })
  search?: string;

  @IsOptional()
  @IsEnum(LessonStatus, {
    message: `O status deve ser um dos seguintes valores: ${Object.values(LessonStatus).join(', ')}.`,
  })
  status?: LessonStatus;

  @IsPositive({ message: 'O course_id deve ser um número inteiro positivo.' })
  @Type(() => Number)
  course_id: number;
}
