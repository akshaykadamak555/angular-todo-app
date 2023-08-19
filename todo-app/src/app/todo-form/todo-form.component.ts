import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  todoForm: FormGroup;

  assigneeList = ['Akshay Kadam', 'Sachin More' ];
  priorityList = ['High', 'Medium', 'Low'];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
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
    this.apiService.createNewTodoTask(this.todoForm.value).subscribe(response =>
      console.log('response', response))
      this.apiService.newRecordCreated(true);
  }
}
