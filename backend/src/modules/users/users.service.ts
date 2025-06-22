import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (emailExists) {
      throw new ConflictException('E-mail já cadastrado!');
    }

    const user = this.userRepository.create(createUserDto);
    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const emailExists = await this.userRepository.findOneBy({
      email: updateUserDto.email,
    });

    if (emailExists && emailExists.id !== id) {
      throw new ConflictException('E-mail já cadastrado!');
    }

    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.userRepository.remove(user);
  }
}
