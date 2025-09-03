import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../interfaces/task.Interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskStatusPipe } from '../../../pipes/task-status-pipe';
import { HighlightVowelDirective } from '../../../directives/highlight-vowel';
@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, RouterLink, TaskStatusPipe, HighlightVowelDirective],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TaskService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  task: Task | null = null;
  loading = false;
  notFound = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    if (!id) {
      this.notFound = true;
      return;
    }

    this.loading = true;
    this.service
      .getTaskById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((t) => {
        this.task = t;
        this.loading = false;
        this.notFound = !t;
      });
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
  goEdit(id: number) {
    this.router.navigate(['/tasks', id, 'edit']);
  }
}
