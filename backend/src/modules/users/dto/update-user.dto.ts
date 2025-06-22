import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ValidateIf } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ValidateIf((values: UpdateUserDto) => values.password !== undefined)
  @Match('password', { message: 'As senhas não coincidem.' })
  confirm_password: string;
}
