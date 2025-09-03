import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { TaskList } from './features/tasks/task-list/task-list';
import { TaskDetail } from './features/tasks/task-detail/task-detail';
import { AddTask } from './features/tasks/add-task/add-task';
import { TaskEdit } from './features/tasks/task-edit/task-edit';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio' },

  {
    path: 'tasks',
    children: [
      { path: '', component: TaskList, title: 'Tareas' },
      {
        path: ':id',
        children: [
          { path: '', component: TaskDetail, title: 'Detalle de tarea' },
          { path: 'edit', component: TaskEdit, title: 'Editar tarea' },
        ],
      },
    ],
  },

  { path: 'add-task', component: AddTask, title: 'Nueva tarea' },
  { path: '**', redirectTo: '' },
];
