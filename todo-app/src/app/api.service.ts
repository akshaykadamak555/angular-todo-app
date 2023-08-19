import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  todoListURL = 'http://localhost:3000/todolist';

  isNewRecordCreated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getTodoList(): Observable<any> {
    return this.http.get(this.todoListURL);
  }

  createNewTodoTask(payload: any) {
    return this.http.post(this.todoListURL, payload);
  }

  newRecordCreated(value: boolean) {
    this.isNewRecordCreated$.next(value);
  }
}
