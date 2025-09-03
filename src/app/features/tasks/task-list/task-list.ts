import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task, Filter } from '../../../interfaces/task.Interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskStatusPipe } from '../../../pipes/task-status-pipe';
import { HighlightVowelDirective } from '../../../directives/highlight-vowel';

@Component({
  selector: 'app-task-list',

  imports: [CommonModule, RouterLink, FormsModule, TaskStatusPipe, HighlightVowelDirective],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  private readonly service = inject(TaskService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  tasks: Task[] = [];
  loading = false;
  errorMsg: string | null = null;
  filter: Filter = 'all';

  now = new Date();

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMsg = null;

    this.service
      .getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.tasks = data;
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'No se pudo cargar la lista.';
          this.loading = false;
        },
      });
  }

  get filtered(): Task[] {
    if (this.filter === 'done') return this.tasks.filter((t) => t.completed);
    if (this.filter === 'pending') return this.tasks.filter((t) => !t.completed);
    return this.tasks;
  }

  onDelete(t: Task): void {
    if (!confirm(`¿Eliminar "${t.title}" (id ${t.id})?`)) {
      return;
    }

    this.service
      .deleteTask(t.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ok) => {
        if (ok) this.tasks = this.tasks.filter((x) => x.id !== t.id);
        else alert('No se pudo eliminar (API dummy).');
      });
  }

  onEdit(t: Task): void {
    this.router.navigate(['/tasks', t.id, 'edit']);
  }

  icon(done: boolean) {
    return done ? '✅' : '⏳';
  }

  userNameById(id: number): string {
    const map: Record<number, string> = {
      1: 'Álvaro',
      2: 'Beatriz',
      3: 'Ignacio',
      4: 'Olivia',
      5: 'Úrsula',
      6: 'Pedro',
      7: 'Sofía',
      8: 'Andrés',
      9: 'Elena',
      10: 'Óscar',
    };
    return map[id] ?? `Usuario ${id}`;
  }
}
