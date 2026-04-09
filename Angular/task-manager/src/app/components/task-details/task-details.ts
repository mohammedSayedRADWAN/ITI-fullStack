import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, DatePipe } from '@angular/common';
import { TaskService } from '../../services/task-service';

@Component({
  standalone: true,
  selector: 'app-task-details',
  imports: [NgIf, RouterLink, DatePipe],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails implements OnInit {
  route = inject(ActivatedRoute);
  taskService = inject(TaskService);
  taskId = signal<number | null>(null);

  task = computed(() => {
    const id = this.taskId();
    if (!id) {
      return undefined;
    }
    return this.taskService.getTask(id);
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Task ID from route:', id);
    if (id) {
      const numericId = +id;
      console.log('Converted task ID:', numericId);
      this.taskId.set(numericId);
      console.log('Task found:', this.task());
    } else {
      console.log('No Task ID provided in the route.');
    }
  }
}
