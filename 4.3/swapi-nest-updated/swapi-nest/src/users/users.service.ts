import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.enum';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  create(email: string, passwordHash: string, role: UserRole = UserRole.USER): Promise<User> {
    const user = this.usersRepository.create({ email, password: passwordHash, role });
    return this.usersRepository.save(user);
  }
}
