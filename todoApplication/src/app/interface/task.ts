export interface Task {
  _id?: string;
  userId?: string;
  todoName: string;
  todoDescription: string;
  isCompleted: boolean;
  isFavourite: boolean;
}
