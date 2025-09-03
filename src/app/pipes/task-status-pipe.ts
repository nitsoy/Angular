import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus',
  pure: true,
})
export class TaskStatusPipe implements PipeTransform {
  transform(completed: boolean, mode: 'emoji' | 'text' = 'emoji'): string {
    if (mode === 'text') return completed ? 'Completada' : 'Pendiente';
    return completed ? '✅' : '⏳';
  }
}
