import { Routes } from '@angular/router';
import { TaskDetails } from './components/task-details/task-details';
import { TaskList } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';

export const routes: Routes = [
    {
        path: '',
        component:TaskList

    },
   
      {
        path: 'task/:id',
        component:TaskDetails

    },
      {
        path: 'add-task',
        component:TaskForm

    },
];
