import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  todoForm: FormGroup;

  assigneeList = [{ name: 'Akshay Kadam' }, { name: 'Sachin More' }];
  priorityList = ['High', 'Medium', 'Low']

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.todoForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      assignTo: ['', Validators.required],
      priority: [''],
    });
  }

  submit() {
    console.log('form', this.todoForm.value);
  }
}
