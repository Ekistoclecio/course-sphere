import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LessonStatus } from 'src/modules/lessons/entities/lesson.entity';

export class FindLessonsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(LessonStatus)
  status?: LessonStatus;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  course_id?: number;
}
