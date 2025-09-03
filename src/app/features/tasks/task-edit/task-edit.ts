import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../interfaces/task.Interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-task-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.scss',
})
export class TaskEdit implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);

  id = 0;
  title = '';
  userId: number | null = null;
  completed = false;

  loading = false;
  saving = false;
  notFound = false;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    if (!this.id) {
      this.notFound = true;
      return;
    }

    this.loading = true;
    this.service
      .getTaskById(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((t) => {
        this.loading = false;
        if (!t) {
          this.notFound = true;
          return;
        }
        this.title = t.title;
        this.userId = t.userId;
        this.completed = t.completed;
      });
  }

  onSubmit(): void {
    if (!this.title.trim() || !this.userId) {
      alert('Falta título o usuario.');
      return;
    }
    this.saving = true;

    const task: Task = {
      id: this.id,
      title: this.title.trim(),
      userId: this.userId,
      completed: this.completed,
    };

    this.service
      .updateTask(task)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/tasks', this.id]),
        error: () => {
          this.saving = false;
          alert('No se pudo actualizar (API dummy).');
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
