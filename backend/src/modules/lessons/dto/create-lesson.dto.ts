import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsFutureDate } from 'src/common/decorators/is-future-date.decorator';
import { IsVideoUrl } from 'src/common/decorators/is-video-url.decorator';

export class CreateLessonDto {
  @IsString({ message: 'O título deve ser um texto.' })
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @MinLength(3, { message: 'O título deve ter pelo menos 3 caracteres.' })
  @MaxLength(255, { message: 'O título deve ter no máximo 255 caracteres.' })
  title: string;

  @IsDateString(
    {},
    { message: 'A data de publicação deve ser uma data válida.' },
  )
  @IsNotEmpty({ message: 'A data de publicação é obrigatória.' })
  @IsFutureDate({
    message: 'A data de publicação deve ser uma data futura.',
  })
  publish_date: Date;

  @IsUrl({}, { message: 'A URL do vídeo deve ser válida.' })
  @IsNotEmpty({ message: 'A URL do vídeo é obrigatória.' })
  @IsVideoUrl({
    message:
      'A URL do vídeo deve ser de um serviço suportado. Os servições suportados atualmente são Vimeo ou YouTube',
  })
  video_url: string;

  @IsNotEmpty({ message: 'O curso é obrigatório.' })
  @IsNumber({}, { message: 'O ID do curso deve ser um número.' })
  course_id: number;
}
