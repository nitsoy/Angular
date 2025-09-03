export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export type Filter = 'all' | 'done' | 'pending';
