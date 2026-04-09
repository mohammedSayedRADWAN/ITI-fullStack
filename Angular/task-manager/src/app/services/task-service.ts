import { Injectable, signal } from '@angular/core';


interface Task {
  id:Number
  title:String
  description:String
  completed:Boolean
  createdAt:Date
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  id:Number
  title:String
  description:String
  completed:Boolean
  createdAt:Date

  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.completed = false;
    this.createdAt = new Date();
  }
  private tasksSignal=signal<Task[]>([
    {
    id: 1,
    title: "Learn Node.js",
    description: "Study Express and build REST APIs",
    completed: false,
    createdAt: new Date("2026-04-01")
  },
  {
    id: 2,
    title: "Build E-commerce Backend",
    description: "Implement products, cart, and orders النظام",
    completed: true,
    createdAt: new Date("2026-04-03")
  },
  {
    id: 3,
    title: "Practice GraphQL",
    description: "Create queries and mutations with Apollo",
    completed: false,
    createdAt: new Date("2026-04-07")
  },
  ]);

  tasks = this.tasksSignal.asReadonly();
  
  getTask(id: number) {
    return this.tasks().find(task => task.id === id); 
  }
}
