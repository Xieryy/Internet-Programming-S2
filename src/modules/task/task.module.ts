import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TaskModule {}
