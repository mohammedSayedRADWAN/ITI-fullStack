import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private fb=inject(FormBuilder)
  taskForm=this.fb.group({
    title:['',[Validators.required,Validators.minLength(3)]],
    description:['',[Validators.required,Validators.minLength(10)]]
  })
  onSubmit(){
    if(this.taskForm.valid){
      console.log('Form Value:', this.taskForm.value);
    }else{
      console.log('Form is invalid');
    }
  }
}
