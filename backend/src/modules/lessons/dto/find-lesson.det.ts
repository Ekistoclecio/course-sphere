import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LessonStatus } from 'src/modules/lessons/entities/lesson.entity';
import { Transform } from 'class-transformer';

export class FindLessonsDto extends PaginationDto {
  @IsNotEmpty({ message: 'O ID do curso é obrigatório.' })
  @IsNumber({}, { message: 'O ID do curso deve ser um número.' })
  @Transform(({ value }) => Number(value))
  course_id: number;

  @IsOptional()
  @IsString({ message: 'O campo de busca deve ser um texto válido.' })
  search?: string;

  @IsOptional()
  @IsEnum(LessonStatus, {
    message: `O status deve ser um dos seguintes valores: ${Object.values(LessonStatus).join(', ')}.`,
  })
  status?: LessonStatus;
}
