
import { Injectable } from '@nestjs/common';
import { CreateTasksDto, UpdateTasksDto } from '../dtos';

@Injectable()
export class DbService {
  createTasks(createTasksDto: CreateTasksDto) {
    // Przykład: Możesz tutaj połączyć się z bazą danych
    return 'Tasks created';
  }

  findAllTasks() {
    return 'All taskss fetched';
  }

  updateTasks(id: string, updateTasksDto: UpdateTasksDto) {
    return 'Tasks updated';
  }
}
