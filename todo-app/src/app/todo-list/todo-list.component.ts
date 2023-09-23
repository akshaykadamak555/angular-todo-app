import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoList;
  @Output() selectedTask = new EventEmitter();
  constructor(private apiService: ApiService, private messageService: MessageService) {
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
    this.selectedTask.emit(product);
  }

  onDelete(product: any) {
    this.apiService.deleteTask(product.id).subscribe(response =>
      console.log('response', response));
      this.apiService.newRecordCreated(true);
      this.messageService.add({ severity: 'warn', detail: 'Task Deleted' });
    this.getTodoList();
  }
}
