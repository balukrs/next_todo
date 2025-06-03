import { ToDoType } from '@/models/tasks';
import { pageParams } from './pagination';

export type ToDoResponse = {
  data: ToDoType[];
  pagination: pageParams;
};
