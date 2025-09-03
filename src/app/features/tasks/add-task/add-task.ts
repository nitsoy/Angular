import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  private readonly service = inject(TaskService);
  private readonly router = inject(Router);

  title = '';
  userId: number | null = null;
  completed = false;
  saving = false;

  onSubmit() {
    if (!this.title.trim() || !this.userId) {
      alert('Falta título o usuario.');
      return;
    }
    this.saving = true;

    this.service
      .addTask({
        title: this.title.trim(),
        userId: this.userId,
        completed: this.completed,
      })
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigate(['/tasks']);
          }, 2000);
        },
        error: () => {
          this.saving = false;
          alert('No se pudo crear (API dummy).');
        },
      });
  }
}
