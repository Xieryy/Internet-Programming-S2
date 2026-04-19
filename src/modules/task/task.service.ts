import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  getTask(id: string) {
    const nid = Number(id);
    return this.tasksRepo.findOne({ where: { id: nid }, relations: ['user'] });
  }

  createTask(body: Partial<Task>) {
    const task = this.tasksRepo.create(body);
    return this.tasksRepo.save(task);
  }

  async updateTask(id: string, body: Partial<Task>) {
    const nid = Number(id);
    await this.tasksRepo.update(nid, body);
    return this.getTask(String(nid));
  }

  deleteTask(id: string) {
    const nid = Number(id);
    return this.tasksRepo.delete(nid);
  }
}
