import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const userExists = await this.userRepo.findOne({ where: { email } });
    if (userExists) throw new BadRequestException('Email déjà utilisé');

    if (!password) throw new BadRequestException('Le mot de passe ne peut pas être vide');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepo.create({ email, password: hashedPassword });
    await this.userRepo.save(newUser);
    return { message: 'Inscription réussie' };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Email ou mot de passe incorrect');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Email ou mot de passe incorrect');

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }
}
