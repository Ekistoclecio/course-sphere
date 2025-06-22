import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsAfterDate } from 'src/common/decorators/is-after-date.decorator';

export class CreateCourseDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres.' })
  name: string;

  @IsString({ message: 'A descrição deve ser um texto.' })
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres.' })
  @IsOptional()
  description?: string;

  @IsDateString({}, { message: 'A data de início deve ser uma data válida.' })
  @IsNotEmpty({ message: 'A data de início é obrigatória.' })
  start_date: Date;

  @IsDateString({}, { message: 'A data de término deve ser uma data válida.' })
  @IsNotEmpty({ message: 'A data de término é obrigatória.' })
  @IsAfterDate('start_date', {
    message: 'A data de término deve ser posterior à data de início.',
  })
  end_date: Date;
}
