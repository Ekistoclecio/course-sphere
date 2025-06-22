import { ArrayNotEmpty, IsArray, IsPositive } from 'class-validator';

export class UpdateInstructorsDto {
  @IsArray({ message: 'instructors_ids deve ser um array de IDs.' })
  @ArrayNotEmpty({ message: 'instructors_ids não pode ser vazio.' })
  @IsPositive({ each: true, message: 'ID do usuário invalido' })
  instructors_ids: number[];
}
