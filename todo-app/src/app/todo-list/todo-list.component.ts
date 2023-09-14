import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoList;
  constructor(private apiService: ApiService) {
    this.apiService.isNewRecordCreated$.subscribe(value => {
      if (value) {
        this.getTodoList();
      }
    })
  }

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.apiService.getTodoList().subscribe((response) => {
      this.todoList = response;
      console.log('todo list', response);
    });
  }

  onEdit(product: any) {
    console.log('selected product', product);
  }
}
