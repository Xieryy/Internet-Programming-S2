import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  createUser(body: Partial<User>) {
    const user = this.usersRepo.create(body);
    return this.usersRepo.save(user);
  }

  getUser(username: string) {
    return this.usersRepo.findOne({ where: { username }, relations: ['tasks'] });
  }

  async updateUser(body: Partial<User> & { username: string }) {
    const { username, ...update } = body;
    await this.usersRepo.update({ username }, update);
    return this.getUser(username);
  }

  deleteUser(username: string) {
    return this.usersRepo.delete({ username });
  }
}
