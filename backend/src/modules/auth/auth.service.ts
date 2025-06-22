import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import jwtConfig from 'src/modules/auth/config/jwt.config';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { HashingService } from 'src/modules/auth/hashing/hashing.service';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({
      email: loginDto.email,
    });

    if (user) {
      const isPasswordValid = await this.hashingService.compare(
        loginDto.password,
        user.password_hash,
      );
      if (isPasswordValid) {
        const payload = { id: user.id, email: user.email, name: user.name };
        const token = await this.jwtService.signAsync(payload, {
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.jwtTtl,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        });

        return token;
      }
    }

    throw new UnauthorizedException('E-mail ou senha inválidos.');
  }
}
