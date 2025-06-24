import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({ message: 'A senha deve ser um texto.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @MaxLength(60, { message: 'A senha deve ter no máximo 60 caracteres.' })
  current_password: string;

  @ValidateIf(
    (values: UpdateUserDto) =>
      values.password !== undefined && values.password.length > 0,
  )
  @IsString({ message: 'A senha deve ser um texto.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @MaxLength(60, { message: 'A senha deve ter no máximo 60 caracteres.' })
  password?: string;

  @ValidateIf(
    (values: UpdateUserDto) =>
      values.password !== undefined && values.password.length > 0,
  )
  @IsString({ message: 'A confirmação de senha deve ser um texto.' })
  @Match('password', { message: 'As senhas não coincidem.' })
  confirm_password?: string;
}
