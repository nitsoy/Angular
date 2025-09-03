import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task.Interface';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/todos`).pipe(
      //map((tasks) => tasks.slice(0, 25)),
      catchError((err) => {
        console.error('getTasks()', err);
        return of([]);
      })
    );
  }

  getTaskById(id: number): Observable<Task | null> {
    return this.http.get<Task>(`${this.baseUrl}/todos/${id}`).pipe(
      catchError((err) => {
        console.error('getTaskById()', err);
        return of(null);
      })
    );
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/todos`, task).pipe(
      catchError((err) => {
        console.error('addTask()', err);
        // simulamos id para continuar el flujo
        return of({ ...task, id: Math.floor(Math.random() * 100000) });
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/todos/${task.id}`, task).pipe(
      catchError((err) => {
        console.error('updateTask()', err);
        return of(task);
      })
    );
  }

  deleteTask(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/todos/${id}`).pipe(
      map(() => true),
      catchError((err) => {
        console.error('deleteTask()', err);
        return of(false);
      })
    );
  }
}
