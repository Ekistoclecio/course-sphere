import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/modules/auth/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (emailExists) {
      throw new ConflictException('E-mail já cadastrado!');
    }

    const passwordHash = await this.hashingService.hash(createUserDto.password);

    const newUser = {
      name: createUserDto.name,
      email: createUserDto.email,
      password_hash: passwordHash,
    };

    const user = this.userRepository.create(newUser);
    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'password_hash', 'email', 'name'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const isCurrentPasswordValid = await this.hashingService.compare(
      updateUserDto.current_password,
      user.password_hash,
    );

    if (!isCurrentPasswordValid) {
      throw new ForbiddenException('Senha atual inválida.');
    }

    if (updateUserDto.email) {
      const emailExists = await this.userRepository.findOneBy({
        email: updateUserDto.email,
      });

      if (emailExists && emailExists.id !== id) {
        throw new ConflictException('E-mail já cadastrado!');
      }
    }

    let passwordHash: string | undefined;
    if (updateUserDto.password) {
      passwordHash = await this.hashingService.hash(updateUserDto.password);
    }

    const newUserData = {
      ...(updateUserDto.name && { name: updateUserDto.name }),
      ...(updateUserDto.email && { email: updateUserDto.email }),
      ...(passwordHash && { password_hash: passwordHash }),
    };

    const updatedUser = await this.userRepository.preload({
      id,
      ...newUserData,
    });

    if (!updatedUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.userRepository.remove(user);
  }
}
